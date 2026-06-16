import { useState } from "react"
import "../../assets/styles/SearchBar.scss"

export default function SearchBar({ onSearch, placeholder = "Поиск..." }) {
    const [search, setSearch] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(search)
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                className="search-bar__input"
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-bar__button" type="submit">
                Найти
            </button>
        </form>
    )
}