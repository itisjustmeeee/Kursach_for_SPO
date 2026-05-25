import { z } from 'zod'

export const issueDocumentSchema = z.object({
    user_id:
        z.coerce.number(),
    document_id:
        z.coerce.number(),
    quantity:
        z.coerce.number().positive(),
    due_date:
        z.string()
})