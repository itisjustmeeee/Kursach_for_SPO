import jwt from 'jsonwebtoken'

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '10m'
        }
    )
}

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id
        },
        process.env.REFRESH_SECRET,
        {
            expiresIn: '7d'
        }
    )
}