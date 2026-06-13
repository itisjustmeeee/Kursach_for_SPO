import { getCellDocumentsService } from "../services/cellDocumentsService.js"

export const getCellDocuments = async (req, res, next) => {
    try {
        const data = await getCellDocumentsService({
            ...req.query,
            cell_id: req.params.id
        })

        res.json(data)
    } catch (err) {
        next(err)
    }
}