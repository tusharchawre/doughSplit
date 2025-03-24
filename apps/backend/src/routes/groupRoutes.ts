import { prismaClient } from "@repo/database/client";
import { createGroupSchema, updateGroupSchema } from "@repo/types";
import express from "express";
import { userMiddleware } from "../middleware";
import { TransactionRouter } from "./transcationRoutes";

const router = express.Router();

router.use("/transactions", TransactionRouter);

router.get("/all", userMiddleware, async (req, res) => {
  const userId = req.userId;

  const groups = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      group: true,
    },
  });

  res.json({
    groups,
  });
});

router.get("/:groupId", userMiddleware, async (req, res) => {
  const groupId = req.params.groupId;

  if (!groupId) {
    res.json({
      error: "The Group Id is Invalid...",
    });
    return;
  }

  const group = await prismaClient.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      members: true,
      transactions: true,
    },
  });

  if (!group) {
    res.json({
      message: "Group doesn't exist!",
    });
    return;
  }

  res.json({
    group,
  });
});

router.post("/create-group", userMiddleware, async (req, res) => {
  const validatedBody = createGroupSchema.safeParse(req.body);

  if (!validatedBody.success) {
    res.json("Invalid Input");
    return;
  }

  const { groupName, groupDescription, members } = validatedBody.data;

  const group = await prismaClient.group.create({
    data: {
      groupName,
      groupDescription,
      members: {
        connect: members.map((userId) => ({ id: userId })),
      },
    },
    include: {
      members: true,
    },
  });

  if (!group) {
    res.json("Something went wrong.");
    return;
  }

  res.json({
    success: "Group was created successfully!",
    group,
  });
});

router.delete("/", userMiddleware, async (req, res) => {
  const { groupId } = req.body;

  const userId = req.userId;
  if (!userId) {
    res.json({
      error: "User Doesn't Exist",
    });
    return;
  }

  const group = await prismaClient.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      members: true,
    },
  });

  const unsettledTxn = await prismaClient.transaction.findMany({
    where: {
      groupId,
      settledStatus: "PENDING",
    },
  });

  if (unsettledTxn.length > 0) {
    res.status(400).json({
      error:
        "There are unsettled transactions in the group. Please settle them before deleting the group.",
    });
    return;
  }

  if (!group) {
    res.json({
      error: "Group Doesnt Exist",
    });
    return;
  }

  const validMember = group.members.find((user) => user.id === userId);

  if (!validMember) {
    res.json({
      error: "Unauthorised!",
    });
    return;
  }

  await prismaClient.$transaction(async (tx) => {
    await tx.share.deleteMany({
      where: {
        transaction: {
          groupId,
        },
      },
    });
    await tx.settlement.deleteMany({
      where: {
        transaction: {
          groupId,
        },
      },
    });
    await tx.transaction.deleteMany({
      where: {
        groupId,
      },
    });

    await tx.group.delete({
      where: {
        id: groupId,
      },
    });
  });

  res.json({
    message: "Group Deleted Successfully!",
  });
});

router.put("/", userMiddleware, async (req, res) => {
  const validatedBody = updateGroupSchema.safeParse(req.body);

  if (!validatedBody.success) {
    res.json({ message: "Invalid Details!" });
    return;
  }

  const { groupName, groupDescription, members, groupId } = validatedBody.data;

  const group = await prismaClient.group.update({
    where: {
      id: groupId,
    },
    data: {
      groupName,
      groupDescription,
      members: {
        connect: members.map((userId) => ({ id: userId })),
      },
    },
    include: {
      members: true,
    },
  });

  res.json({
    message: "Group Updated Successfully!",
    group,
  });
});

router.post("/leave-group", userMiddleware, async (req, res) => {
  const { groupId } = req.body;
  const userId = req.userId;

  try {
    const owedByUser = await prismaClient.share.findMany({
      where: {
        userId,
        transaction: {
          groupId: groupId,
        },
        isSettled: false,
      },
    });

    const owedToUser = await prismaClient.share.findMany({
      where: {
        transaction: {
          groupId: groupId,
          paidById: userId,
        },
        userId: {
          not: userId,
        },
        isSettled: false,
      },
    });

    const allUnsettledTransactions = [...owedByUser, ...owedToUser];

    if (allUnsettledTransactions.length > 0) {
      const totalOwed = owedByUser.reduce(
        (sum, share) => sum + share.amount,
        0,
      );
      const totalOwing = owedToUser.reduce(
        (sum, share) => sum + share.amount,
        0,
      );

      res.status(400).json({
        error: `Cannot leave group: You have ${allUnsettledTransactions.length} unsettled transactions. You owe ${totalOwed} and others owe you ${totalOwing}.`,
      });
      return;
    }

    const updateGroup = await prismaClient.group.update({
      where: {
        id: groupId,
      },
      data: {
        members: {
          disconnect: {
            id: userId,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (updateGroup.members.length === 0) {
      await prismaClient.group.delete({
        where: {
          id: groupId,
        },
      });
    }

    res.json({
      message: "You have successfully left the group!",
    });
  } catch (error) {
    console.error("Error leaving group:", error);
    res.status(500).json({
      error: "Failed to process your request to leave the group.",
    });
  }
});

export { router as GroupRouter };
