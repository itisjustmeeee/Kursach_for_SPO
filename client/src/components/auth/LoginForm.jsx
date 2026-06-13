import { useState } from "react"

export default function LoginForm({ onSubmit, error }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ email, password })
    }

    return (
        <div>
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">
                    Войти
                </button>
            </form>
            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}
        </div>
    )
}