import prisma from "../config/prisma.js"

export const getCellsService = async (query) => {
    const { shelf_id, empty, status, search, sort = "code", order = "asc" } = query

    const where = {}

    if (shelf_id) {
        where.shelf_id = Number(shelf_id)
    }

    if (search) {
        where.code = {
            contains: search,
            mode: "insensitive"
        }
    }

    if (empty === "true") {
        where.document_locations = {
            none: {}
        }
    }

    const cells = await prisma.cells.findMany({
        where,
        include: {
            shelves: {
                include: {
                    racks: true
                }
            },
            document_locations: true
        }
    })

    let result = cells.map(cell => {
        const current_load = cell.document_locations.reduce(
            (sum, location) => sum + location.quantity,
            0
        )

        const free_space = cell.max_capacity - current_load

        const fill_percent = cell.max_capacity > 0 
            ? Math.round((current_load / cell.max_capacity) * 100)
            : 0

        return {
            ...cell,
            current_load,
            free_space,
            fill_percent
        }
    })

    if (sort === "fill_percent") {
        result.sort((a, b) => order === "asc"
            ? a.fill_percent - b.fill_percent
            : b.fill_percent - a.fill_percent
        )
    }

    if (sort === "free_space") {
        result.sort((a, b) => order === "asc"
            ? a.free_space - b.free_space
            : b.free_space - a.free_space
        )
    }

    if (sort === "code") {
        result.sort((a, b) => order === "asc"
            ? a.code.localeCompare(b.code)
            : b.code.localeCompare(a.code)
        )
    }

    if (status) {
        result = result.filter(cell => {
            switch (status) {
                case "empty":
                    return cell.current_load === 0

                case "filled":
                    return cell.current_load > 0 && cell.current_load < cell.max_capacity

                case "full":
                    return cell.current_load >= cell.max_capacity

                default:
                    return true
            }
        })
    }

    return result
}

export const getCellByIdService = async (id) => {
    return prisma.cells.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            shelves: {
                include: {
                    racks: true
                }
            },
            document_locations: {
                include: {
                    documents: true
                }
            }
        }
    })
}

export const createCellService = async (data) => {
    console.log("shelf_id =", data.shelf_id)

    const shelf = await prisma.shelves.findUnique({
        where: {
            id: Number(data.shelf_id)
        }
    })

    if (!shelf) {
        throw new Error("Полка не найдена")
    }

    return prisma.cells.create({
        data: {
            shelf_id: Number(data.shelf_id),
            code: data.code,
            max_capacity: Number(data.max_capacity)
        }
    })
}

export const updateCellService = async (id, data) => {
    return prisma.cells.update({
        where: {
            id: Number(id)
        },
        data: {
            code: data.code,
            max_capacity: Number(data.max_capacity)
        }
    })
}

export const deleteCellService = async (id) => {
    const cell = await prisma.cells.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            document_locations: true
        }
    })

    if (!cell) {
        throw new Error("Ячейка не найдена")
    }

    if (cell.document_locations.length > 0) {
        throw new Error("Нельзя удалить ячейку, содержащую документы")
    }

    return prisma.cells.delete({
        where: {
            id: Number(id)
        }
    })
}