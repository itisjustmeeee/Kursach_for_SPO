export const permissionMiddleware = (permission) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const hasPermission = req.user.permissions?.includes(permission)

        if (!hasPermission) {
            return res.status(403).json({ message: "Forbidden" })
        }

        next()
    }
}