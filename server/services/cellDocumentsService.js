import prisma from "../config/prisma.js"

export const getCellDocumentsService = async (query) => {
    const { cell_id, search, sort = "title", order = "asc", subject } = query

    console.log("query =", query)
    console.log("cell_id =", cell_id)

    const parsedCellId = Number(cell_id)

    if (!parsedCellId || isNaN(parsedCellId)) {
        throw new Error("Некорректный cell_id")
    }

    const where = {
        cell_id: parsedCellId,

        ...(subject && {
            documents: {
                subject: {
                    contains: subject,
                    mode: "insensitive"
                }
            }
        })
    }

    const docs = await prisma.document_locations.findMany({
        where,
        include: {
            documents: true,
            cells: true
        }
    })

    let result = docs

    if (search) {
        result = result.filter(item => item.documents?.title?.toLowerCase().includes(search.toLowerCase()))
    }

    if (sort === "title") {
        result.sort((a, b) => order === "asc"
            ? a.documents.title.localeCompare(b.documents.title)
            : b.documents.title.localeCompare(a.documents.title)
        )
    }

    if (sort === "inventory_number") {
        result.sort((a, b) => order === "asc"
            ? a.documents.inventory_number - b.documents.inventory_number
            : b.documents.inventory_number - a.documents.inventory_number
        )
    }

    if (sort === "created_at") {
        result.sort((a, b) => order === "asc"
            ? new Date(a.documents.created_at) - new Date(b.documents.created_at)
            : new Date(b.documents.created_at) - new Date(a.documents.created_at)
        )
    }

    return result
}