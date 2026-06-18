import jwt from 'jsonwebtoken'

export const generateAccessToken = (user, permissions) => {
    return jwt.sign(
        {
            id: user.id,
            permissions,
            roles: user.user_roles?.map(r => r.roles.name) || []
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '60m'
        }
    )
}

export const generateRefreshToken = (user, permissions) => {
    return jwt.sign(
        {
            id: user.id,
            permissions,
            roles: user.user_roles?.map(r => r.roles.name) || []
        },
        process.env.REFRESH_SECRET,
        {
            expiresIn: '7d'
        }
    )
}