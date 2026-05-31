import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth.js"
import api from "../../api/axios.js"
import LoginForm from "../../components/auth/LoginForm.jsx"

export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [error, setError] = useState("")

    const handleLogin = async (data) => {
        try {
            const res = await api.post("/api/auth/login", data)

            const { user, accessToken } = res.data

            localStorage.setItem("token", accessToken)
            login(user)

            navigate("/")
        } catch (err) {
            setError(err?.response?.data?.message || "Ошибка входа")
        }
    }

    return (
        <main>
            <div>
                <LoginForm onSubmit={handleLogin} error={error}/>

                <p style={{ textAlign: "center" }}>
                    Еще нет аккаунта?{" "}
                    <Link to="/register">
                        Зарегистрироваться
                    </Link>
                </p>
            </div>
        </main>
    )
}