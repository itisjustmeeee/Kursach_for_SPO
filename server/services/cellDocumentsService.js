import prisma from "../config/prisma.js"

export const getCellDocumentsService = async (cell_id) => {
    return prisma.document_locations.findMany({
        where: {
            cell_id: Number(cell_id)
        },
        include: {
            documents: true,
            cells: true
        }
    })
}