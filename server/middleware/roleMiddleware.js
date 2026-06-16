export const roleMiddleware = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const hasRole = req.user.roles?.some(r => allowedRoles.includes(r))

        if (!hasRole) {
            return res.status(403).json({ message: "Forbidden" })
        }

        next()
    }
}