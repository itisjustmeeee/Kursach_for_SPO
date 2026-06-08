import prisma from "../config/prisma.js"

export const getUsersStatsService = async () => {
    const totalUsers = await prisma.users.count()

    const usersWithLoans = await prisma.document_loans.groupBy({
        by: ["user_id"]
    })

    const usersWithoutLoans = totalUsers - usersWithLoans.length

    const usersWithActiveLoans = await prisma.document_loans.groupBy({
        by: ["user_id"],
        where: {
            status: "issued"
        }
    })

    const overdueUsers = await prisma.document_loans.groupBy({
        by: ["user_id"],
        where: {
            status: "issued",
            due_date: {
                lt: new Date()
            }
        }
    })

    const totalLoans = await prisma.document_loans.count()

    const returnedLoans = await prisma.document_loans.count({
        where: {
            status: "returned"
        }
    })

    const activeLoans = await prisma.document_loans.count({
        where: {
            status: "issued"
        }
    })

    const overdueLoans = await prisma.document_loans.count({
        where: {
            status: "issued",
            due_date: {
                lt: new Date()
            }
        }
    })

    const topUser = await prisma.document_loans.groupBy({
        by: ["user_id"],
        _count: {
            id: true
        },
        orderBy: {
            _count: {
                id: "desc"
            }
        },
        take: 1
    })

    let mostActiveUser = null

    if (topUser.length > 0) {
        mostActiveUser = await prisma.users.findUnique({
            where: {
                id: topUser[0].user_id
            }
        })
    }

    return {
        totalUsers,
        usersWithoutLoans,
        usersWithActiveLoans: usersWithActiveLoans.length,
        overdueUsers: overdueUsers.length,

        totalLoans,
        returnedLoans,
        activeLoans,
        overdueLoans,

        mostActiveUser
    }
}