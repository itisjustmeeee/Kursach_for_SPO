import { getRacksService, getRackByIdService, createRackService, updateRackService, deleteRackService } from "../services/racksService.js"

export const getRacks = async (req, res, next) => {
    try {
        const data = await getRacksService(req.query)

        res.json(data)
    } catch (err) {
        next(err)
    }
}

export const getRackById = async (req, res, next) => {
    try {
        const rack = await getRackByIdService(req.params.id)

        res.json(rack)
    } catch (err) {
        next(err)
    }
}

export const createRack = async (req, res, next) => {
    try {
        const rack = await createRackService(req.params.id, req.body)

        res.json(rack)
    } catch (err) {
        next(err)
    }
}

export const updateRack = async (req, res, next) => {
    try {
        const rack = await updateRackService(req.params.id, req.body)

        res.json(rack)
    } catch (err) {
        next(err)
    }
}

export const deleteRack = async (req, res, next) => {
    try {
        await deleteRackService(req.params.id)

        res.status(204).send()
    } catch (err) {
        next(err)
    }
}
