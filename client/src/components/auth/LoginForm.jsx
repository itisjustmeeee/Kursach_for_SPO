import { useState } from "react"
import "../../assets/styles/loginForm.scss"

export default function LoginForm({ onSubmit, error }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ email, password })
    }

    return (
        <div className="login-form-card">
            <h2 className="login-form-card__title">
                Вход
            </h2>
            <form onSubmit={handleSubmit} className="login-form-card__form">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit" className="login-form-card__button">
                    Войти
                </button>
            </form>
            {error && (
                <p className="login-form-card__error">
                    {error}
                </p>
            )}
        </div>
    )
}