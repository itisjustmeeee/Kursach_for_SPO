import prisma from "../config/prisma.js"
import { getEmptyCellsService, getEmptyShelvesService, getEmptyRacksService, getMostLoadedCellService, getUnusedDocumentsService } from "./reportService.js"

export const getArchiveStatsService = async () => {
    const [
        racksCount,
        shelvesCount,
        cellsCount,
        documentsCount,
        emptyRacks,
        emptyShelves,
        emptyCells,
        mostLoadedCell,
        unusedDocuments,
        activeLoans,
        overdueLoans,
        copiesCount
    ] = await Promise.all([
        prisma.racks.count(),
        prisma.shelves.count(),
        prisma.cells.count(),
        prisma.documents.count(),

        getEmptyRacks(),
        getEmptyShelves(),
        getEmptyCells(),

        getMostLoadedCell(),

        getUnusedDocuments(180),

        prisma.document_loans.count({
            where: {
                status: "issued"
            }
        }),

        prisma.document_loans.count({
            where: {
                status: "issued",
                due_date: {
                    lt: new Date()
                }
            }
        }),

        prisma.document_loans.aggregate({
            _sum: {
                quantity: true
            }
        })
    ])

    return {
        totalRacks: racksCount,
        totalShelves: shelvesCount,
        totalCells: cellsCount,

        totalDocuments: documentsCount,

        totalCopies: copiesCount._sum.quantity || 0,

        emptyRacks: emptyRacks.length,
        emptyShelves: emptyShelves.length,
        emptyCells: emptyCells.length,

        activeLoans,
        overdueLoans,

        unusedDocumentsCount: unusedDocuments.length,

        mostLoadedCell
    }
}