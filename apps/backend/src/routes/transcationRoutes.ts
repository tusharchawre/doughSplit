import { prismaClient } from "@repo/database/client"
import { createTxnSchema, updateTxnSchema } from "@repo/types"
import express from "express"
import { userMiddleware } from "../middleware"


const router = express.Router()

router.get("/", async (req, res) => {
    const { groupId } = req.body

    const transactions = await prismaClient.transaction.findMany({
        where: {
            groupId
        },
        include: {
            participants: true
        }
    })

    if (!transactions) {
        res.json({
            error: "Invalid Request"
        })
        return
    }

    res.json({
        transactions
    })
})

router.post("/add", userMiddleware, async (req, res) => {
    const validatedBody = createTxnSchema.safeParse(req.body)

    if (!validatedBody.success) {
        res.json({
            message: "Invalid Details"
        })
        return
    }

    const { txnName, description, groupId, paidById, participants, amount, currency } = validatedBody.data

    const txn = await prismaClient.transaction.create({
        data: {
            txnName,
            description,
            groupId,
            paidById,
            participants: {
                connect: participants.map(userId => ({ id: userId }))
            },
            amount,
            currency
        },
        include: {
            participants: true
        }
    })


    res.json({
        message: "Transaction Created Succesfully",
        txn
    })


})

router.delete("/", userMiddleware, async (req, res) => {
    const { txnId } = req.body

    await prismaClient.transaction.delete({
        where: {
            id: txnId
        }
    })

    res.json({
        message: "Txn Deleted Successfully."
    })

})

router.put("/", userMiddleware, async (req, res) => {
    const validatedBody = updateTxnSchema.safeParse(req.body)

    if (!validatedBody.success) {
        res.json({
            message: "Invalid Details"
        })
        return
    }

    const { txnName, description, groupId, paidById, participants, amount, currency, txnId, status } = validatedBody.data

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
                connect: participants?.map(userId => ({id: userId}))
            },
            amount,
            currency,
            settledStatus: status
        }
    })


    res.json({
        txn
    })
})


export { router as TransactionRouter }