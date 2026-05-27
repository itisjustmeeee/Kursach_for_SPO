import { includes } from "zod"
import prisma from "../config/prisma.js"

export const getUsersService = async () => {
    return await prisma.users.findMany({
        include: {
            user_roles: {
                include: {
                    roles: true
                }
            }
        }
    })
}

export const getUserByIdService = async (id) => {
    return await prisma.users.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            user_roles: {
                include: {
                    roles: true
                }
            },

            document_loans: true
        }
    })
}