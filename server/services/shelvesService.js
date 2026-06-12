import { tr } from "zod/v4/locales"
import prisma from "../config/prisma.js"

export const getShelvesService = async (query) => {
    const { rack_id } = query

    return prisma.shelves.findMany({
        where: rack_id ? { rack_id: Number(rack_id) } : {},
        include: {
            cells: true,
            racks: true
        }
    })
}

export const getShelfByIdService = async (id) => {
    return prisma.shelves.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            racks: true,
            cells: true
        }
    })
}

export const createShelfService = async (data) => {
    const rack = await prisma.racks.findUnique({
        where: {
            id: Number(data.rack_id)
        }
    })

    if (!rack) {
        throw new Error("Стеллаж не найден")
    }

    return prisma.shelves.create({
        data: {
            rack_id: Number(data.rack_id),
            code: data.code
        }
    })
}

export const updateShelfService = async (id, data) => {
    return prisma.shelves.update({
        where: {
            id: Number(id)
        },
        data: {
            code: data.code
        }
    })
}

export const deleteShelfService = async (id) => {
    const shelf = await prisma.shelves.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            cells: true
        }
    })

    if (!shelf) {
        throw new Error("Полка не найдена")
    }

    if (shelf.cells.length > 0) {
        throw new Error("Нельзя удалить полку, содержащую ячейки")
    }

    return prisma.shelves.delete({
        where: {
            id: Number(id)
        }
    })
}