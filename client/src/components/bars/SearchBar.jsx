import { useState } from "react"

export default function SearchBar({ onSearch, placeholder = "Поиск..." }) {
    const [search, setSearch] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(search)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
                Найти
            </button>
        </form>
    )
}