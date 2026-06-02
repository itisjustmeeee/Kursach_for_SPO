import prisma from "../config/prisma.js"

export const getRacksService = async (query) => {
    const { search, page = 1, limit = 20 } = query

    return prisma.racks.findMany({
        where: search ? { code: { contains: search, mode: 'insensitive' } } : {},
        skip: (page - 1) * limit,
        take: Number(limit),
        include: {
            shelves: true
        }
    })
}

export const getRackById = async (id) => {
    return await prisma.racks.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            shelves: true
        }
    })
}

export const createRackService = async (data) => {
    return await prisma.racks.create({
        data
    })
}

export const updateRackService = async (id, data) => {
    return await prisma.racks.update({
        where: {
            id: Number(id)
        },
        data
    })
}

export const deleteRackService = async (id) => {
    const rack = await prisma.racks.findUnique({
        where: { id: Number(id) },
        include: { shelves: true }
    })

    if (rack.shelves.length > 0) {
        throw new Error("Нельзя удалить стеллаж с полками")
    }

    return await prisma.racks.delete({
        where: { id: Number(id) }
    })
}