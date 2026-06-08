import prisma from "../config/prisma.js"

export const getDocumentsStatsService = async () => {
    const totalDocuments = await prisma.documents.count()

    const totalCopies = await prisma.document_locations.aggregate({
        _sum: {
            quantity: true
        }
    })

    const documentsWithFiles = await prisma.documents.count({
        where: {
            file_path: {
                not: null
            }
        }
    })

    const issuedDocuments = await prisma.document_loans.count({
        where: {
            status: "issued"
        }
    })

    const subjects = await prisma.documents.groupBy({
        by: ["subject"]
    })

    const mostRequested = await prisma.document_loans.groupBy({
        by: ["document_id"],
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

    let topDocument = null

    if (mostRequested.length > 0) {
        topDocument = await prisma.documents.findUnique({
            where: {
                id: mostRequested[0].document_id
            }
        })
    }

    return {
        totalDocuments,
        totalCopies: totalCopies._sum.quantity || 0,

        documentsWithFiles,
        issuedDocuments,

        subjectsCount: subjects.length,

        topDocument
    }
}