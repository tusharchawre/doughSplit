import express from "express";
import { registerSchema, loginSchema, updateSchema } from "@repo/types";
import { prismaClient } from "@repo/database/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { userMiddleware } from "../middleware";
import { FriendsRouter } from "./friendRoutes";

const router = express.Router();

router.use("/friends", FriendsRouter);

router.post("/register", async (req, res) => {
  const validatedBody = registerSchema.safeParse(req.body);

  if (!validatedBody.success) {
    res.json({
      error: "Invalid Credentials",
    });
    return;
  }

  const { username, password, email } = validatedBody.data;

  const existingUser = await prismaClient.user.findFirst({
    where: {
      email,
      username,
    },
  });

  if (existingUser) {
    res.json({
      error: "User already exists",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prismaClient.user.create({
    data: {
      username,
      password: hashedPassword,
      email,
    },
  });

  res.json({
    message: "User created successfully",
    user,
  });
});

router.post("/login", async (req, res) => {
  const validatedBody = loginSchema.safeParse(req.body);

  if (!validatedBody.success) {
    res.json({
      error: "Invalid Credentials",
    });
    return;
  }

  const { email, password } = validatedBody.data;

  const user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (!user || !user.password) {
    res.json({
      error: "User not found",
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.json({
      error: "Invalid Credentials",
    });
    return;
  }

  const userId = user.id;

  const token = await jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET! || "tusharchawre0240",
  );

  res.json({
    token,
  });
});

router.get("/id/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.json({
      message: "Invalid Id",
    });
    return;
  }

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      friends: true,
      involvedIn: true,
      group: true,
    },
  });

  if (!user) {
    res.json({
      message: "User Not Found",
    });
    return;
  }

  res.json({
    user,
  });
});

router.get("/profile", userMiddleware, async (req, res) => {
  const userId = req.userId;

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      group: true,
      friends: {
        select: {
          id: true,
          username: true,
          email: true,
          phoneNumber: true,
          imageUrl: true,
        },
      },
      involvedIn: {
        include: {
          participants: {
            select: {
              id: true,
              username: true,
              email: true,
              phoneNumber: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  res.json({
    user,
  });
});

router.put("/", userMiddleware, async (req, res) => {
  const validatedBody = updateSchema.safeParse(req.body);

  const userId = req.userId;

  if (!validatedBody.success) {
    res.json({
      error: "Invalid Update Details.",
    });
    return;
  }

  const { username, password, phoneNumber, imageUrl, email } =
    validatedBody.data;

  const user = await prismaClient.user.update({
    where: {
      email,
      id: userId,
    },
    data: {
      username,
      password,
      phoneNumber,
      imageUrl,
    },
  });

  res.json({
    user,
  });
});

router.post("/net-balances", userMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const allTransactions = await prismaClient.transaction.findMany({
      where: {
        OR: [
          { paidById: userId },
          {
            shares: {
              some: {
                userId: userId,
                isSettled: false,
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

    const friendBalances = {};

    let totalNetBalance = 0;

    for (const transaction of allTransactions) {
      if (transaction.paidBy.id === userId) {
        for (const share of transaction.shares) {
          if (share.user.id === userId) continue;

          if (!friendBalances[share.user.id]) {
            friendBalances[share.user.id] = {
              userId: share.user.id,
              username: share.user.username,
              imageUrl: share.user.imageUrl,
              netBalance: 0,
            };
          }

          friendBalances[share.user.id].netBalance += share.amount;
          totalNetBalance += share.amount;
        }
      } else {
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
              netBalance: 0,
            };
          }

          friendBalances[friendId].netBalance -= userShare.amount;
          totalNetBalance -= userShare.amount;
        }
      }
    }

    const netBalances = Object.values(friendBalances);

    res.status(200).json({
      success: true,
      totalNetBalance,
      netBalances,
    });
  } catch (error: any) {
    console.error("Error calculating net balances:", error);
    res.status(500).json({
      success: false,
      message: "Failed to calculate net balances",
      error: error.message,
    });
    return;
  }
});

export { router as UserRouter };
