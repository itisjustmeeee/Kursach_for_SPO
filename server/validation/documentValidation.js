import { z } from 'zod'

export const createDocumentSchema = z.object({
    title:
        z.string().min(1),
    subject:
        z.string().min(1),
    inventory_number:
        z.string().min(1),
    quantity_total:
        z.number().positive()
})

export const updateDocumentSchema = z.object({
    title:
        z.string().optional(),
    subject:
        z.string().optional(),
    inventory_number:
        z.string().optional(),
    quantity_total:
        z.number().positive().optional()
})

export const moveDocumentSchema = z.object({
    location_id:
        z.coerce.number().int().positive(),
    new_cell_id:
        z.coerce.number().int().positive()
})