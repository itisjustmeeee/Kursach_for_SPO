import prisma from "../config/prisma.js"

export const getDocumentById = async (id) => {
    return await prisma.documents.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            document_locations: {
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
            }
        }
    })
}

export const getDocumentsService = async (query) => {
    const {search, title, subject, inventory_number, sort, order, page = 1, limit = 20} = query

    const allowedSortFields = [
        'title',
        'subject',
        'created_at',
        'inventory_number'
    ]

    const sortField = allowedSortFields.includes(sort) ? sort : 'created_at'

    const sortOrder = order === 'asc' ? 'asc' : 'desc'

    const where = {}

    if (search) {
        where.OR = [
            {
                title: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            {
                inventory_number: {
                    contains: search
                }
            }
        ]
    }

    if (title) {
        where.title = {
            contains: title,
            mode: 'insensitive'
        }
    }

    if (subject) {
        where.subject = {
            contains: subject,
            mode: 'insensitive'
        }
    }

    if (inventory_number) {
        where.inventory_number = {
            contains: inventory_number
        }
    }

    const skip = (Number(page) - 1) * Number(limit)

    const documents = await prisma.documents.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: {
            [sortField]: sortOrder
        },
        include: {
            document_locations: {
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
            }
        }
    })

    const total = await prisma.documents.count({where})

    const totalPages = Math.ceil(total / Number(limit))

    return {documents, total, page: Number(page), limit: Number(limit), totalPages}
}
