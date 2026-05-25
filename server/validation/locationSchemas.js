import { z } from 'zod'

export const createDocumentLocationSchema = z.object({
    document_id: z.coerce.number({
        invalid_type_error: 'document id must be a number'
    }).int().positive(),
    cell_id: z.coerce.number({
        invalid_type_error: 'cell id must be a number'
    }).int().positive(),
    quantity: z.coerce.number({
        invalid_type_error: 'quantity id must be a number'
    }).int().positive()
})

export const updateDocumentLocationSchema = z.object({
    cell_id: z.coerce.number().int().positive().optional(),
    quantity: z.coerce.number().int().positive().optional()
}).refine(
    data => data.cell_id !== undefined || data.quantity !== undefined,
    {
        message: 'at least one field is required'
    }
)