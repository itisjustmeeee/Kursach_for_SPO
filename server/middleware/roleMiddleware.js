export const roleMiddleware = (allowedRoles = []) => {
    return (req, res, next) => {
        const userRoles = req.user.user_roles.map(
            ur => ur.role.name
        )

        const hasRole = userRoles.some(role => allowedRoles.includes(role))

        if (!hasRole) {
            return res.status(403).json({ message: 'Forbidden: role denied' })
        }

        next()
    }
}