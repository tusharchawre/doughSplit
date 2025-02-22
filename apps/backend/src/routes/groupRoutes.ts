import { prismaClient } from "@repo/database/client";
import { createGroupSchema, updateGroupSchema } from "@repo/types";
import express from "express";
import { userMiddleware } from "../middleware";
import { TransactionRouter } from "./transcationRoutes";

const router = express.Router();

router.use("/transactions", TransactionRouter);



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
      message: "User Doesn't Exist",
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

  await prismaClient.group.delete({
    where: {
      id: groupId,
    },
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

export { router as GroupRouter };
