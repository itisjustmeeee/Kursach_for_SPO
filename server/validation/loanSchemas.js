import { z } from 'zod'

export const issueDocumentSchema = z.object({
    document_id:
        z.coerce.number().int().positive(),
    quantity:
        z.coerce.number().positive()
})