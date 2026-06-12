import { getCellsService, getCellByIdService, createCellService, updateCellService, deleteCellService } from "../services/cellsService.js"

export const getCells = async (req, res, next) => {
    try {
        const data = await getCellsService(req.query)

        res.json(data)
    } catch (err) {
        next(err)
    }
}

export const getCellById = async (req, res, next) => {
    try {
        const cell = await getCellByIdService(req.params.id)

        res.json(cell)
    } catch (err) {
        next(err)
    }
}

export const createCell = async (req, res, next) => {
    try {
        const cell = await createCellService(req.body)

        res.status(201).json(cell)
    } catch (err) {
        next(err)
    }
}

export const updateCell = async (req, res, next) => {
    try {
        const cell = await updateCellService(req.params.id, req.body)

        res.json(cell)
    } catch (err) {
        next(err)
    }
}

export const deleteCell = async (req, res, next) => {
    try {
        await deleteCellService(req.params.id)

        res.status(204).send()
    } catch (err) {
        next(err)
    }
}
