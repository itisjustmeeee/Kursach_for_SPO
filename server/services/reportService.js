import { includes } from "zod"
import prisma from "../config/prisma.js"

export const getDocumentLocations = async (document_id) => {
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

export const getUsersBySubject = async (subject) => {
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

export const getMostLoadedCell = async () => {
    return await prisma.document_locations.groupBy({
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
}

export const getLastBorrower = async (document_id) => {
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

export const getEmptyCells = async () => {
    return await prisma.cells.findMany({
        where: {
            document_locations: {
                none: {}
            }
        }
    })
}

export const getEmptyShelves = async () => {
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

export const getEmptyRacks = async () => {
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

export const getUnusedDocuments = async (months) => {
    const date = new Date()

    date.setMonth(date.getMonth() - Number(months))

    return await prisma.documents.findMany({
        where: {
            document_loans: {
                none: {
                    issued_at: {
                        gte: date
                    }
                }
            }
        }
    })
}