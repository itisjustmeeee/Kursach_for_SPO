import prisma from "../config/prisma.js"

export const issueDocumentService = async (data) => {
    return await prisma.$transaction(
        async (tx) => {
            const document = await tx.documents.findUnique({
                where: {
                    id: Number(data.document_id)
                }
            })

            if (!document) {
                throw new Error('Document not found')
            }

            const stored = await tx.document_locations.aggregate({
                where: {
                    document_id: Number(data.document_id)   
                },
                _sum: {
                    quantity: true
                }
            })

            const available = stored._sum.quantity || 0

            if (available < data.quantity) {
                throw new Error('Not enough documents avaliable')
            }

            const loan = await tx.document_loans.create({
                data: {
                    user_id: data.user_id,
                    document_id: data.document_id,
                    quantity: data.quantity,
                    status: 'pending'
                }
            })

            console.log("Creating loan:", {
                user_id: data.user_id,
                document_id: data.document_id
            })

            return loan
        }
    )
}

export const returnDocumentsService = async (loan_id) => {
    return await prisma.$transaction(
        async (tx) => {
            const loan = await tx.document_loans.findUnique({
                where: {
                    id: Number(loan_id)
                }
            })

            if (!loan) {
                throw new Error('loan not found')
            }

            if (loan.status === 'returned') {
                throw new Error('document already returned')
            }

            return await tx.document_loans.update({
                where: {
                    id: Number(loan_id)
                },
                data: {
                    status: 'returned',
                    returned_at: new Date()
                }
            })
        }
    )
}

export const getLoansService = async () => {
    return prisma.document_loans.findMany({
        include: {
            users: true,
            documents: true
        }
    })
}

export const getLoanService = async (id) => {
    return prisma.document_loans.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            users: true,
            documents: true
        }
    })
}

export const approveLoanService = async (id, employee_id) => {
    const loan = await prisma.document_loans.findUnique({
        where: {
            id: Number(id)
        }
    })

    if (!loan) {
        throw new Error('loan not found')
    }
    
    return prisma.document_loans.update({
        where: {
            id: Number(id)
        },
        data: {
            status: 'issued',
            issued_by: employee_id,
            due_date: new Date(
                Date.now() + 14 * 24 * 60 * 60 * 1000
            )
        }
    })
}

export const rejectLoanService = async (id) => {
    const loan = await prisma.document_loans.findUnique({
        where: {
            id: Number(id)
        }
    })

    if (!loan) {
        throw new Error('loan not found')
    }

    return prisma.document_loans.update({
        where: {
            id: Number(id)
        },
        data: {
            status: "rejected"
        }
    })
}

export const getActiveLoansService = async (query = {}) => {
    const { search, overdueOnly, sort = "issued_at", order = "desc" } = query

    const allowedSortFields = [
        "issued_at",
        "due_date"
    ]

    const sortField = allowedSortFields.includes(sort)
        ? sort
        : "issued_at"

    const sortOrder = order === "asc"
        ? "asc"
        : "desc"

    return prisma.document_loans.findMany({
        where: {
            status: "issued",

            ...(overdueOnly === "true" && {
                due_date: {
                    lt: new Date()
                }
            }),

            ...(search && {
                OR: [
                    {
                        documents: {
                            title: {
                                contains: search,
                                mode: "insensitive"
                            }
                        }
                    },
                    {
                        users: {
                            first_name: {
                                contains: search,
                                mode: "insensitive"
                            }
                        }
                    },
                    {
                        users: {
                            last_name: {
                                contains: search,
                                mode: "insensitive"
                            }
                        }
                    }
                ]
            })
        },
        include: {
            users: true,
            documents: {
                include: {
                    document_locations: {
                        include: {
                            cells: {
                                include: {
                                    shelves: true
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: {
            [sortField]: sortOrder
        }
    })
}

export const getOverdueLoansService = async () => {
    return prisma.document_loans.findMany({
        where: {
            status: "issued",
            due_date: {
                lt: new Date()
            }
        },
        include: {
            users: true,
            documents: {
                include: {
                    document_locations: {
                        include: {
                            cells: {
                                include: {
                                    shelves: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

export const getUserLoansService = async (user_id) => {
    return prisma.document_loans.findMany({
        where: {
            user_id: Number(user_id)
        },
        include: {
            users: true,
            documents: true
        }
    })
}

export const getPendingLoansService = async () => {
    return prisma.document_loans.findMany({
        where: {
            status: 'pending'
        },
        include: {
            users: true,
            documents: true
        },
        orderBy: {
            issued_at: "desc"
        }
    })
}

export const getHistoryLoansService = async (query = {}) => {
    const { search, subject, sort = "returned_at", order = "desc" } = query

    const allowedSortFields = [
        "returned_at",
        "issued_at"
    ]

    const sortField = allowedSortFields.includes(sort)
        ? sort
        : "returned_at"

    const sortOrder = order === "asc"
        ? "asc"
        : "desc"

    let result = await prisma.document_loans.findMany({
        where: {
            status: "returned",
            ...(subject && {
                documents: {
                    subject: {
                        contains: subject,
                        mode: "insensitive"
                    }
                }
            }),
            ...(search && {
                OR: [
                    {
                        documents: {
                            title: {
                                contains: search,
                                mode: "insensitive"
                            }
                        }
                    },
                    {
                        users: {
                            first_name: {
                                contains: search,
                                mode: "insensitive"
                            }
                        }
                    },
                    {
                        users: {
                            last_name: {
                                contains: search,
                                mode: "insensitive"
                            }
                        }
                    }
                ]
            })
        },
        include: {
            documents: {
                include: {
                    document_locations: {
                        include: {
                            cells: {
                                include: {
                                    shelves: true
                                }
                            }
                        }
                    }
                }
            },
            users: true
        },
        orderBy: {
            [sortField]: sortOrder
        }
    })

    if (sort === "title") {
        result.sort((a, b) => order === "asc"
            ? a.documents.title.localeCompare(b.documents.title)
            : b.documents.title.localeCompare(a.documents.title)
        )
    }

    return result
}

export const getMyLoansService = async (user_id) => {
    return prisma.document_loans.findMany({
        where: {
            user_id
        },
        include: {
            documents: true
        },
        orderBy: {
            issued_at: "desc"
        }
    })
}