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


router.get("/getUsers", userMiddleware, async(req,res)=> {
    const users = await prismaClient.user.findMany()

    res.json({
        users
    })
})


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
      where: { id: friendId }
    });

    if (!friendExists) {
        res.status(404).json({ message: "Friend not found" });
    }

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      include: { friends: true }
    });

    const alreadyFriends = user?.friends.some(friend => friend.id === friendId);
    
    if (alreadyFriends) {
        res.json({ message: "Friend Already Exists!" });
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: {
        friends: {
          connect: [{ id: friendId }]
        }
      },
      include: {
        friends: true
      }
    });

    const updateFriend = await prismaClient.user.update({
        where: { id: friendId },
        data: {
          friends: {
            connect: [{ id: userId }]
          }
        },
        include: {
          friends: true
        }
      });

    res.json({ 
      message: "Friends Created!",
      friends: updatedUser.friends.length
    });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ 
      message: "Error creating friend relationship",
      error: error 
    });
  }
});

export { router as FriendsRouter };