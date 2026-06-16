import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth.js"
import api from "../../api/axios.js"
import LoginForm from "../../components/auth/LoginForm.jsx"
import "../../assets/styles/loginForm.scss"

export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [error, setError] = useState("")

    const handleLogin = async (data) => {
        try {
            const res = await api.post("/auth/login", data)

            const { user, accessToken } = res.data
            login(user, accessToken)

            navigate("/")
        } catch (err) {
            setError(err?.response?.data?.message || "Ошибка входа")
        }
    }

    return (
        <main className="login-page">
            <div className="login-page__wrapper">
                <LoginForm onSubmit={handleLogin} error={error}/>

                <div className="login-page__register-card">
                    <h3 className="login-page__register-card__title">
                        Еще нет аккаунта?{" "}
                    </h3>
                    <p className="login-page__register-card__text">
                        Зарегистрируйтесь, чтобы продолжить работу с архивом
                    </p>
                    <Link to="/register" className="login-page__register-card__button">
                        Зарегистрироваться
                    </Link>
                </div>
            </div>
        </main>
    )
}