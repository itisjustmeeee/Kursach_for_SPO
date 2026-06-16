import { includes } from "zod"
import prisma from "../config/prisma.js"

export const getDocumentLocationsService = async (document_id) => {
    return await prisma.document_locations.findMany({
        where: {
            document_id: Number(document_id)
        },
        include: {
            cells: {
                include: {
                    shelves: {
                        include: {
                            racks: true
                        }
                    }
                }
            }
        }
    })
}

export const getUsersBySubjectService = async (subject) => {
    return await prisma.document_loans.findMany({
        where: {
            documents: {
                subject: {
                    contains: subject,
                    mode: "insensitive"
                }
            }
        },
        include: {
            users: true,
            documents: true
        }
    })
}

export const getMostLoadedCellService = async () => {
    const result = await prisma.document_locations.groupBy({
        by: ['cell_id'],
        _sum: {
            quantity: true
        },
        orderBy: {
            _sum: {
                quantity: 'desc'
            }
        },
        take: 1
    })

    if (!result.length) return null

    const cellId = result[0].cell_id
    const used = result[0]._sum.quantity || 0

    const cell = await prisma.cells.findUnique({
        where: { id: cellId }
    })

    if (!cell) return null

    const fill_percent = Math.round((used / cell.max_capacity) * 100)

    return {
        cell_id: cellId,
        code: cell.code,
        fill_percent
    }
}

export const getLastBorrowerService = async (document_id) => {
    return await prisma.document_loans.findFirst({
        where: {
            document_id: Number(document_id)
        },
        orderBy: {
            issued_at: 'desc'
        },
        include: {
            users: true
        }
    })
}

export const getEmptyCellsService = async () => {
    return await prisma.cells.findMany({
        where: {
            document_locations: {
                none: {}
            }
        }
    })
}

export const getEmptyShelvesService = async () => {
    return await prisma.shelves.findMany({
        where: {
            cells: {
                every: {
                    document_locations: {
                        none: {}
                    }
                }
            }
        }
    })
}

export const getEmptyRacksService = async () => {
    return await prisma.racks.findMany({
        where: {
            shelves: {
                every: {
                    cells: {
                        every: {
                            document_locations: {
                                none: {}
                            }
                        }
                    }
                }
            }
        }
    })
}

export const getUnusedDocumentsService = async (months) => {
    const date = new Date()

    date.setMonth(
        date.getMonth() - Number(months)
    )

    return await prisma.documents.findMany({
        where: {
            document_loans: {
                none: {
                    issued_at: {
                        gte: date
                    }
                }
            }
        },
        include: {
            document_locations: true
        }
    })
}