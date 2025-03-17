import { prismaClient } from "@repo/database/client";
import { createTxnSchema, updateTxnSchema } from "@repo/types";
import express from "express";
import { userMiddleware } from "../middleware";

const router = express.Router();

router.post("/", async (req, res) => {
  const { groupId } = req.body;

  const transactions = await prismaClient.transaction.findMany({
    where: {
      groupId,
    },
    include: {
      participants: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  if (!transactions) {
    res.json({
      error: "Invalid Request",
    });
    return;
  }

  res.json({
    transactions,
  });
});

router.get("/:txnId", async (req, res) => {
  const txnId = Number(req.params.txnId);

  const txn = await prismaClient.transaction.findUnique({
    where: {
      id: txnId,
    },
    include: {
      participants: true,
      shares: true
    },
  });

  res.json({
    txn,
  });
});

router.post("/add", userMiddleware, async (req, res) => {
  const validatedBody = createTxnSchema.safeParse(req.body);

  if (!validatedBody.success) {
    res.json({
      message: "Invalid Details",
    });
    return;
  }

  const {
    txnName,
    description,
    groupId,
    paidById,
    participants,
    amount,
    currency,
    shares,
  } = validatedBody.data;

  const result = await prismaClient.$transaction(async (prisma) => {
    const txn = await prisma.transaction.create({
      data: {
        txnName,
        description,
        groupId,
        paidById,
        participants: {
          connect: participants.map((userId) => ({ id: userId })),
        },
        amount,
        currency,
      },
      include: {
        participants: true,
      },
    });

    const defaultShareAmount = (amount / participants.length);

    const sharePromises = participants.map(userId => {
      const shareAmount = shares && shares[userId] ? shares[userId] : defaultShareAmount;

      return prisma.share.create({
        data: {
          transactionId: txn.id,
          userId,
          amount: shareAmount,
          isSettled: userId === paidById,
        }
      });
    });

    const createdShares = await Promise.all(sharePromises);

    return { txn, shares: createdShares };
  });

  res.json({
    message: "Transaction Created Successfully",
    ...result
  });
});

router.delete("/", userMiddleware, async (req, res) => {
  const { txnId } = req.body;

  await prismaClient.share.deleteMany({
    where:{
      transactionId: txnId
    }
  })

  await prismaClient.transaction.delete({
    where: {
      id: txnId,
    },
  });

  res.json({
    message: "Txn Deleted Successfully.",
  });
});

router.put("/", userMiddleware, async (req, res) => {
  const validatedBody = updateTxnSchema.safeParse(req.body);

  if (!validatedBody.success) {
    res.json({
      message: "Invalid Details" + validatedBody.error,
    });
    return;
  }

  const {
    txnName,
    description,
    groupId,
    paidById,
    participants,
    amount,
    currency,
    txnId,
    status,
  } = validatedBody.data;

  const txn = await prismaClient.transaction.update({
    where: {
      id: txnId,
      groupId,
    },
    data: {
      txnName,
      description,
      paidById,
      participants: {
        connect: participants?.map((userId) => ({ id: userId })),
      },
      amount,
      currency,
      settledStatus: status,
    },
  });

  res.json({
    txn,
  });
});

router.post("/settle-share", userMiddleware, async (req, res) => {
  const { transactionId } = req.body;
  const userId = req.userId!

  try {
    const share = await prismaClient.share.findUnique({
      where: {
        transactionId_userId: {
          transactionId,
          userId
        }
      }
    });

    if (!share) {
      res.status(404).json({
        error: "Share not found"
      });
      return;
    }

    const updatedShare = await prismaClient.share.update({
      where: {
        id: share.id
      },
      data: {
        isSettled: true,
        settledAt: new Date()
      }
    });

    const settlement = await prismaClient.settlement.create({
      data: {
        transactionId,
        paidById: userId,
        amount: share.amount
      }
    });

    const allShares = await prismaClient.share.findMany({
      where: {
        transactionId
      }
    });

    const allSettled = allShares.every(s => s.isSettled);

    if (allSettled) {
      await prismaClient.transaction.update({
        where: {
          id: transactionId
        },
        data: {
          settledStatus: "COMPLETED"
        }
      });
    }

    res.json({
      message: "Share settled successfully",
      share: updatedShare,
      settlement,
      transactionCompleted: allSettled
    });
  } catch (error) {
    console.error("Error settling share:", error);
    res.status(500).json({
      error: "Failed to settle share"
    });
  }
});

router.post("/bulk-settle-user", userMiddleware, async (req, res) => {
  const { userId, groupId, friendId } = req.body;

  if (!userId) {
    res.status(400).json({
      error: "User ID is required"
    });
    return
  }

  try {
    const query: any = {
      userId,
      isSettled: false
    };

    const transactionQuery: any = {};

    if (groupId) {
      transactionQuery.groupId = groupId;
    }

    if (friendId) {
      transactionQuery.paidById = friendId;
    }

    if (Object.keys(transactionQuery).length > 0) {
      query.transaction = {
        some: transactionQuery
      };
    }

    const shares = await prismaClient.share.findMany({
      where: query,
      include: {
        transaction: true
      }
    });

    if (shares.length === 0) {
     res.json({
        message: "No unsettled shares found",
        settledCount: 0
      });
      return
    }

    const results = [];
    const errors = [];
    let totalAmount = 0;

    for (const share of shares) {
      try {
        const updatedShare = await prismaClient.share.update({
          where: {
            id: share.id
          },
          data: {
            isSettled: true,
            settledAt: new Date()
          }
        });

        const settlement = await prismaClient.settlement.create({
          data: {
            transactionId: share.transactionId,
            paidById: userId,
            amount: share.amount
          }
        });

        totalAmount += share.amount;

        const allShares = await prismaClient.share.findMany({
          where: {
            transactionId: share.transactionId
          }
        });

        const allSettled = allShares.every(s => s.isSettled);

        if (allSettled) {
          await prismaClient.transaction.update({
            where: {
              id: share.transactionId
            },
            data: {
              settledStatus: "COMPLETED"
            }
          });
        }

        results.push({
          transactionId: share.transactionId,
          shareId: share.id,
          amount: share.amount,
          transactionCompleted: allSettled
        });
      } catch (error) {
        console.error(`Error settling share ${share.id}:`, error);
        errors.push({
          shareId: share.id,
          transactionId: share.transactionId,
          error: "Failed to settle share"
        });
      }
    }

  res.json({
      message: "Bulk settlement processed for user",
      totalAmount,
      settledCount: results.length,
      errorCount: errors.length,
      results,
      errors
    });
  } catch (error) {
    console.error("Bulk settlement error:", error);
   res.status(500).json({
      error: "Failed to process bulk settlement for user"
    });
  }
});


router.post("/settle-with-friend", userMiddleware, async (req, res) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    res.status(400).json({
      error: "Both user ID and friend ID are required"
    });
    return
  }

  try {
    const sharesOwedToFriend = await prismaClient.share.findMany({
      where: {
        userId,
        isSettled: false,
        transaction: {
          paidById: friendId
        }
      },
      include: {
        transaction: true
      }
    });

    const sharesOwedByFriend = await prismaClient.share.findMany({
      where: {
        userId: friendId,
        isSettled: false,
        transaction: {
          paidById: userId
        }
      },
      include: {
        transaction: true
      }
    });

    if (sharesOwedToFriend.length === 0 && sharesOwedByFriend.length === 0) {
      res.json({
        message: "No unsettled shares found between these users",
        settledCount: 0
      });
      return
    }


    const amountUserOwesFriend = sharesOwedToFriend.reduce((sum, share) => sum + share.amount, 0);
    const amountFriendOwesUser = sharesOwedByFriend.reduce((sum, share) => sum + share.amount, 0);
    const netAmount = amountUserOwesFriend - amountFriendOwesUser;

    const results = [];
    const errors = [];

    const settleShare = async (share: any, payerId: any) => {
      try {
        const updatedShare = await prismaClient.share.update({
          where: { id: share.id },
          data: {
            isSettled: true,
            settledAt: new Date()
          }
        });

        const settlement = await prismaClient.settlement.create({
          data: {
            transactionId: share.transactionId,
            paidById: payerId,
            amount: share.amount
          }
        });

        const allShares = await prismaClient.share.findMany({
          where: { transactionId: share.transactionId }
        });

        const allSettled = allShares.every(s => s.isSettled);

        if (allSettled) {
          await prismaClient.transaction.update({
            where: { id: share.transactionId },
            data: { settledStatus: "COMPLETED" }
          });
        }

        return {
          transactionId: share.transactionId,
          shareId: share.id,
          amount: share.amount,
          transactionCompleted: allSettled
        };
      } catch (error) {
        throw error;
      }
    };

    if (netAmount > 0) {
      for (const share of sharesOwedToFriend) {
        try {
          const result = await settleShare(share, userId);
          results.push(result);
        } catch (error) {
          console.error(`Error settling share ${share.id}:`, error);
          errors.push({
            shareId: share.id,
            transactionId: share.transactionId,
            error: "Failed to settle share"
          });
        }
      }
    } else if (netAmount < 0) {
      for (const share of sharesOwedByFriend) {
        try {
          const result = await settleShare(share, friendId);
          results.push(result);
        } catch (error) {
          console.error(`Error settling share ${share.id}:`, error);
          errors.push({
            shareId: share.id,
            transactionId: share.transactionId,
            error: "Failed to settle share"
          });
        }
      }
    } else {
      for (const share of [...sharesOwedToFriend, ...sharesOwedByFriend]) {
        try {
          const payerId = share.transaction.paidById === userId ? friendId : userId;
          const result = await settleShare(share, payerId);
          results.push(result);
        } catch (error) {
          console.error(`Error settling share ${share.id}:`, error);
          errors.push({
            shareId: share.id,
            transactionId: share.transactionId,
            error: "Failed to settle share"
          });
        }
      }
    }

    res.json({
      message: "Settlement between users processed",
      netAmount: Math.abs(netAmount),
      direction: netAmount > 0 ? `${userId} paid ${friendId}` : netAmount < 0 ? `${friendId} paid ${userId}` : "Equal settlement",
      settledCount: results.length,
      errorCount: errors.length,
      results,
      errors
    });
  } catch (error) {
    console.error("Settlement between users error:", error);
   res.status(500).json({
      error: "Failed to process settlement between users"
    });
  }
});

export { router as TransactionRouter };
