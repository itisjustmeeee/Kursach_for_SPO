import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../api/axios"
import RegisterForm from "../../components/auth/RegisterForm"

export default function RegisterPage() {
    const navigate = useNavigate()

    const [error, setError] = useState("")

    const handleRegister = async (data) => {
        try {
            await api.post("/auth/register", data)

            navigate("/login")
        } catch (err) {
            setError(
                err?.response?.data?.message || "Ошибка регистрации"
            )
        }
    }

    return (
        <main>
            <div>
                <RegisterForm onSubmit={handleRegister} error={error}/>

                <p className="">
                    Уже есть аккаунт?{" "}
                    <Link to="/login">
                        Войти
                    </Link>
                </p>
            </div>
        </main>
    )
}

