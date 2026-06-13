import { getShelvesService, getShelfByIdService, createShelfService, updateShelfService, deleteShelfService } from "../services/shelvesService.js"

export const getShelves = async (req, res, next) => {
    try {
        const data = await getShelvesService(req.query)
        res.json(data)
    } catch (err) {
        next(err)
    }
}

export const getShelfById = async (req, res, next) => {
    try {
        const shelf = await getShelfByIdService(req.params.id)

        res.json(shelf)
    } catch (err) {
        next(err)
    }
}

export const createShelf = async (req, res, next) => {
    try {
        console.log(req.body)

        const shelf = await createShelfService(req.body)

        res.status(201).json(shelf)
    } catch (err) {
        next(err)
    }
}

export const updateShelf = async (req, res, next) => {
    try {
        const shelf = await updateShelfService(req.params.id, req.body)

        res.json(shelf)
    } catch (err) {
        next(err)
    }
}

export const deleteShelf = async (req, res, next) => {
    try {
        await deleteShelfService(req.params.id)

        res.status(204).send()
    } catch (err) {
        next(err)
    }
}