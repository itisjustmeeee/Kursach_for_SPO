import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import SearchBar from "../../components/bars/SearchBar.jsx"
import Sidebar from "../../components/bars/Sidebar.jsx"
import ShelfCard from "../../components/docs/ShelvesCard.jsx"
import { fecthShelves } from "../../services/ShelvesService.js"

export default function ShelvesPage() {
    const [searchParams] = useSearchParams()
    const rack_id = searchParams.get("rack")
    const [shelves, setShelves] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")
    const [filters, setFilters] = useState({
        sort: 'code',
        order: 'asc'
    })

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)

                const data = await fecthShelves({
                    rack_id: rack_id,
                    search,
                    ...filters
                })

                setShelves(data)
            } catch (err) {
                setError(
                    err.response?.data?.message || "Ошибка загрузки полок"
                )
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [rack_id, search, filters])

    return (
        <div style={{
            display: "flex",
            gap: "20px"
        }}>
            <Sidebar
                filters={filters}
                setFilters={setFilters}
                sortOptions={[
                    {
                        value: "code",
                        label: "По коду"
                    }
                ]}
            />

            <div style={{ flex: 1 }}>
                <h1>
                    Полки
                </h1>

                <Link to="/racks">
                    К стеллажам
                </Link>

                <p>
                    Всего полок: {shelves.length}
                </p>

                <SearchBar
                    placeholder="Поиск полки..."
                    onSearch={setSearch}
                />

                {loading && (
                    <p>
                        Loading...
                    </p>
                )}

                {error && (
                    <p>
                        {error}
                    </p>
                )}

                {!loading && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "16px"
                    }}>
                        {shelves.map(shelf => (
                            <ShelfCard
                                key={shelf.id}
                                shelf={shelf}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )

}
