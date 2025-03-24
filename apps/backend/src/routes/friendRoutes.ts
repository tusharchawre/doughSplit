import express from "express";
import { userMiddleware } from "../middleware";
import { prismaClient } from "@repo/database/client";

const router = express.Router();

router.post("/", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const { friendId } = req.body;

  if (userId === friendId) {
    res.json({ message: "Invalid Request" });
    return;
  }

  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    include: { friends: true },
  });

  const isFriend = user?.friends.some((friend) => friend.id === friendId);

  await prismaClient.user.update({
    where: { id: userId },
    data: {
      friends: isFriend
        ? { disconnect: { id: friendId } }
        : { connect: { id: friendId } },
    },
  });

  res.json({
    message: isFriend ? "Friend removed" : "Friends Now!",
  });
});

router.get("/getUsers", userMiddleware, async (req, res) => {
  const users = await prismaClient.user.findMany();

  res.json({
    users,
  });
});

router.post("/add", userMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { friendId } = req.body;

    if (!userId || !friendId) {
      res.status(400).json({ message: "Missing userId or friendId" });
    }

    if (userId === friendId) {
      res.status(400).json({ message: "Cannot add yourself as a friend" });
    }

    const friendExists = await prismaClient.user.findUnique({
      where: { id: friendId },
    });

    if (!friendExists) {
      res.status(404).json({ message: "Friend not found" });
      return;
    }

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      include: { friends: true },
    });

    const alreadyFriends = user?.friends.some(
      (friend) => friend.id === friendId,
    );

    if (alreadyFriends) {
      const updatedUser = await prismaClient.user.update({
        where: { id: userId },
        data: {
          friends: {
            disconnect: [{ id: friendId }],
          },
        },
        include: {
          friends: true,
        },
      });

      const updateFriend = await prismaClient.user.update({
        where: { id: friendId },
        data: {
          friends: {
            disconnect: [{ id: userId }],
          },
        },
        include: {
          friends: true,
        },
      });

      res.json({ message: "Remove Friend!" });
      return;
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: {
        friends: {
          connect: [{ id: friendId }],
        },
      },
      include: {
        friends: true,
      },
    });

    const updateFriend = await prismaClient.user.update({
      where: { id: friendId },
      data: {
        friends: {
          connect: [{ id: userId }],
        },
      },
      include: {
        friends: true,
      },
    });

    res.json({
      message: "Friends Created!",
      friends: updatedUser.friends.length,
    });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({
      message: "Error creating friend relationship",
      error: error,
    });
  }
});

router.post("/owed-in-group", userMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { groupId } = req.body;

    // Get all unsettled transactions in this group
    const groupTransactions = await prismaClient.transaction.findMany({
      where: {
        groupId: groupId,
        settledStatus: "PENDING",
      },
      include: {
        paidBy: {
          select: {
            id: true,
            username: true,
            imageUrl: true,
          },
        },
        shares: {
          where: {
            isSettled: false,
          },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    // Calculate balances with each friend
    const friendBalances = {};

    for (const transaction of groupTransactions) {
      // If user paid for the transaction
      if (transaction.paidBy.id === userId) {
        // Add what others owe to the user
        for (const share of transaction.shares) {
          // Skip user's own share
          if (share.user.id === userId) continue;

          if (!friendBalances[share.user.id]) {
            friendBalances[share.user.id] = {
              userId: share.user.id,
              username: share.user.username,
              imageUrl: share.user.imageUrl,
              balance: 0,
            };
          }

          // Positive means friend owes money to user
          friendBalances[share.user.id].balance += share.amount;
        }
      }
      // If someone else paid
      else {
        // Find user's share in this transaction
        const userShare = transaction.shares.find(
          (share) => share.user.id === userId,
        );

        if (userShare) {
          const friendId = transaction.paidBy.id;

          if (!friendBalances[friendId]) {
            friendBalances[friendId] = {
              userId: friendId,
              username: transaction.paidBy.username,
              imageUrl: transaction.paidBy.imageUrl,
              balance: 0,
            };
          }

          // Negative means user owes money to friend
          friendBalances[friendId].balance -= userShare.amount;
        }
      }
    }

    // Convert to array for easier frontend handling
    const balances = Object.values(friendBalances);

    res.status(200).json({
      success: true,
      balances,
    });
  } catch (error: any) {
    console.error("Error calculating balances:", error);
    res.status(500).json({
      success: false,
      message: "Failed to calculate balances",
      error: error.message,
    });
    return;
  }
});

router.post("/total-owed-to-friend", userMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { friendId } = req.body;

    // Find all pending transactions where either user or friend was involved
    const transactions = await prismaClient.transaction.findMany({
      where: {
        OR: [
          { paidById: userId },
          { paidById: friendId },
          {
            participants: {
              some: {
                id: userId,
              },
            },
          },
          {
            participants: {
              some: {
                id: friendId,
              },
            },
          },
        ],
        settledStatus: "PENDING",
      },
      include: {
        paidBy: {
          select: {
            id: true,
            username: true,
            imageUrl: true,
          },
        },
        shares: {
          where: {
            isSettled: false,
            OR: [{ userId: userId }, { userId: friendId }],
          },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                imageUrl: true,
              },
            },
          },
        },
        group: {
          select: {
            id: true,
            groupName: true,
          },
        },
      },
    });

    // Calculate the total balance
    let totalBalance = 0;
    const transactionDetails = [];

    for (const transaction of transactions) {
      // If user paid for the transaction
      if (transaction.paidBy.id === userId) {
        // Find friend's share
        const friendShare = transaction.shares.find(
          (share) => share.user.id === friendId,
        );

        if (friendShare) {
          // Friend owes user (positive)
          totalBalance += friendShare.amount;

          transactionDetails.push({
            transactionId: transaction.id,
            transactionName: transaction.txnName,
            groupId: transaction.group.id,
            groupName: transaction.group.groupName,
            amount: friendShare.amount,
            date: transaction.date,
            type: "friend_owes_user",
          });
        }
      }
      // If friend paid for the transaction
      else if (transaction.paidBy.id === friendId) {
        // Find user's share
        const userShare = transaction.shares.find(
          (share) => share.user.id === userId,
        );

        if (userShare) {
          // User owes friend (negative)
          totalBalance -= userShare.amount;

          transactionDetails.push({
            transactionId: transaction.id,
            transactionName: transaction.txnName,
            groupId: transaction.group.id,
            groupName: transaction.group.groupName,
            amount: -userShare.amount,
            date: transaction.date,
            type: "user_owes_friend",
          });
        }
      }
    }

    // Get friend info
    const friend = await prismaClient.user.findUnique({
      where: {
        id: friendId,
      },
      select: {
        id: true,
        username: true,
        imageUrl: true,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        friend,
        totalBalance,
        transactionDetails,
      },
    });
  } catch (error: any) {
    console.error("Error calculating total owed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to calculate total balance with friend",
      error: error.message,
    });
  }
});

export { router as FriendsRouter };
