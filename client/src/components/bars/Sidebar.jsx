export default function Sidebar({ filters, setFilters, sortOptions = [], extraFilters = null }) {
    const handleChange = (e) => {
        setFilters(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <aside>
            <h3>Фильтры</h3>
            <div>
                <label>Сортировка</label>
                <select
                    name="sort"
                    value={filters.sort}
                    onChange={handleChange}
                >
                    {sortOptions.map(option => (
                        <option>
                            key={option.value}
                            value={option.value}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>
                    Порядок
                </label>
                <select
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

            {extraFilters}
        </aside>
    )
}