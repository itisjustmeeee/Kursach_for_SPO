import prisma from "../config/prisma.js"

export const createAuditLog = async ({ user_id, action, entity, entity_id }) => {
    await prisma.audit_logs.create({
        data: {
            user_id,
            action,
            entity,
            entity_id
        }
    })
}