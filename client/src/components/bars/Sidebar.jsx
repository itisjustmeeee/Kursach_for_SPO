import "../../assets/styles/SideBar.scss"

export default function Sidebar({ filters, setFilters, sortOptions = [], extraFilters = null }) {
    const handleChange = (e) => {
        setFilters(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <aside className="sidebar">
            <h3 className="sidebar__title">
                Фильтры
            </h3>
            <div className="sidebar__group">
                <label className="sidebar__label">
                    Сортировка
                </label>
                <select
                    className="sidebar__select"
                    name="sort"
                    value={filters.sort}
                    onChange={handleChange}
                >
                    {sortOptions.map(option => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="sidebar__group">
                <label className="sidebar__label">
                    Порядок
                </label>
                <select
                    className="sidebar__select"
                    name="order"
                    value={filters.order}
                    onChange={handleChange}
                >
                    <option value="asc">
                        По возрастанию
                    </option>
                    <option value="desc">
                        По убыванию
                    </option>
                </select>
            </div>
            <div className="sidebar__extra">
                <h4 className="sidebar__extra-title">
                    Дополнительно
                </h4>
                    {extraFilters}
            </div>
        </aside>
    )
}