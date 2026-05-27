export const permissionMiddleware = (permission) => {
    return async (req, res, next) => {
        const user = req.user

        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        const permissions = user.user_roles
            .flatMap(
                ur => ur.roles?.role_permissions?.map(
                    rp => rp.permissions?.name
                ) || []
            )
            .filter(Boolean)

        if (!permissions.includes(permission)) {
            return res.status(403).json({
                message: 'Forbidden: permission denied'
            })
        }

        next()
    }
}