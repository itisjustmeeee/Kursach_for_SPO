import { Navigate } from "react-router-dom";
import useAuth from '../hooks/useAuth.js'

export default function ProtectedRoute({children, roles = []}) {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login"/>
    }

    if (roles.length > 0 && !roles.includes(user.role)) {
        return <Navigate to="/"/>
    }

    return children
}