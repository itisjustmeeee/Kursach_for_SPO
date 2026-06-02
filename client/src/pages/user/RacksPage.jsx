import { useEffect, useState } from "react"
import SearchBar from "../../components/bars/SearchBar.jsx"
import Sidebar from "../../components/bars/Sidebar.jsx"
import RacksCard from "../../components/docs/RacksCard.jsx"
import { fetchRacks } from "../../services/RacksService.js"

export default function RacksPage() {
    const [racks, setRacks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [filters, setFilters] = useState({
        sort: 'code',
        order: 'asc'
    })
    const [search, setSearch] = useState("")

    useEffect(() => {
        const loadRacks = async () => {
            try {
                setLoading(true)

                const data = await fetchRacks({
                    search,
                    ...filters
                })

                setRacks(data)
            } catch (err) {
                setError(
                    err.response?.data?.message || "Ошибка загрузки стеллажей"
                )
            } finally {
                setLoading(false)
            }
        }

        loadRacks()
    }, [search, filters])

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
                <h1>Стеллажи</h1>

                <p>
                    Всего стеллажей: {racks.length}
                </p>

                <SearchBar
                    placeholder="Поиск стеллажа..."
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
                        {racks.map(rack => (
                            <RacksCard
                                key={rack.id}
                                rack={rack}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}