import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../api/axios"
import RegisterForm from "../../components/auth/RegisterForm"
import useAuth from "../../hooks/useAuth"
import "../../assets/styles/registerForm.scss"

export default function RegisterPage() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [error, setError] = useState("")

    const handleRegister = async (data) => {
        try {
            const res = await api.post("/auth/register", data)

            const { accessToken, user } = res.data

            localStorage.setItem("token", accessToken)

            login(user)

            navigate("/")
        } catch (err) {
            setError(
                err?.response?.data?.message || "Ошибка регистрации"
            )
        }
    }

    return (
        <main className="register-page">
            <div className="register-wrapper">
                <RegisterForm onSubmit={handleRegister} error={error}/>

                <div className="login-card">
                    <h3 className="login-card__title">
                        Уже есть аккаунт?{" "}
                     </h3>
                     <p className="login-card__text">
                        Войдите в систему и продолжите работу с архивом
                     </p>
                    <Link to="/login" className="login-card__button">
                        Войти
                    </Link>
                </div>
            </div>
        </main>
    )
}

