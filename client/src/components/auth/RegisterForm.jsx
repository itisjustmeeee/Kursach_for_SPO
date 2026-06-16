import { useState } from "react"
import "../../assets/styles/registerForm.scss"

const departments = [
    "administration",
    "archive",
    "bookkeeping",
    "HR department",
    "IT department"
]

export default function RegisterForm({ onSubmit, error }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        phone: "",
        department: "",
        password: "",
        confirmPassword: ""
    })

    const [validationError, setValidationError] = useState("")

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        setValidationError("")

        const emailRegex = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")
        const phoneRegex = new RegExp("^\\+7\\d{10}$")

        if (!emailRegex.test(formData.email)) {
            setValidationError("Введите корректный email")
            return
        }

        if (!phoneRegex.test(formData.phone)) {
            setValidationError("Телефон должен быть в формате +79991234567")
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setValidationError("Пароли не совпадают")
            return
        }

        const userData = { ...formData }

        delete userData.confirmPassword

        onSubmit(userData)
    }

    return (
        <div className="register-card">
            <h2 className="register-card__title">
                Регистрация
            </h2>
            <form onSubmit={handleSubmit} className="register-card__form">
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required/>
                <input type="email" name="email" placeholder="email" value={formData.email} onChange={handleChange} required/>
                <input type="text" name="first_name" placeholder="Имя" value={formData.first_name} onChange={handleChange} required/>
                <input type="text" name="last_name" placeholder="Фамилия" value={formData.last_name} onChange={handleChange} required/>
                <input type="text" name="middle_name" placeholder="Отчество" value={formData.middle_name} onChange={handleChange} required/>
                <input type="text" name="phone" placeholder="+79991234567" value={formData.phone} onChange={handleChange} required/>
                <select name="department" value={formData.department} onChange={handleChange} required>
                    <option value="">
                        Выберите отдел
                    </option>

                    {departments.map(department => (
                        <option key={department} value={department}>
                            {department}
                        </option>
                    ))}
                </select>
                <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required/>
                <input type="password" name="confirmPassword" placeholder="Повторите пароль" value={formData.confirmPassword} onChange={handleChange} required/>
                <button type="submit" className="register-card__button">
                    Зарегистрироваться
                </button>
            </form>
            {(validationError || error) && (
                <p className="register-card__error">
                    {validationError || error}
                </p>
            )}
        </div>
    )
}