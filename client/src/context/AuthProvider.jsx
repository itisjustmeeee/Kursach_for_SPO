import { useState, useEffect } from "react"
import AuthContext from "./AuthContext.js"

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const login = (userData, token) => {
        localStorage.setItem("token", token)
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
        localStorage.clear()
    }

    useEffect(() => {
        const wrapper = async () => {
            setLoading(false)
        }

        wrapper()
    }, [])

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider