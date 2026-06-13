import { Navigate } from "react-router-dom";
import useAuth from '../hooks/useAuth.js'

export default function ProtectedRoute({children, roles = []}) {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login"/>
    }

    const userRoles = user.roles || []

    if (roles.length > 0 && !roles.some(role => userRoles.includes(role))) {
        return <Navigate to="/"/>
    }

    return children
}