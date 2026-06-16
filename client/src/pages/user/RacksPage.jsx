import { useEffect, useState, useCallback } from "react"
import SearchBar from "../../components/bars/SearchBar.jsx"
import Sidebar from "../../components/bars/Sidebar.jsx"
import RacksCard from "../../components/docs/RacksCard.jsx"
import StorageFormCard from "../../components/createComponent.jsx"
import { fetchRacks, createRack } from "../../services/RacksService.js"
import useAuth from "../../hooks/useAuth.js"
import "../../assets/styles/PagesStyle.scss"

export default function RacksPage() {
    const { user } = useAuth()
    const [racks, setRacks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [filters, setFilters] = useState({
        sort: 'code',
        order: 'asc'
    })
    const [search, setSearch] = useState("")
    const [newRack, setNewRack] = useState({
        code: ""
    })
    const isAdmin = user?.role === "admin" || user?.roles?.includes("admin")

    const loadRacks = useCallback(async () => {
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
    }, [search, filters])

    useEffect(() => {
        const wrapper = async () => {
            loadRacks()
        }

        wrapper()
    }, [loadRacks])

    const handleRackChange = (name, value) => {
        setNewRack(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCreateRack = async (e) => {
        e.preventDefault()

        try {
            await createRack(newRack)

            setNewRack({
                code: ""
            })


            await loadRacks()
        } catch (err) {
            alert(
                err?.response?.data?.message || "Ошибка создания стеллажа"
            )
        }
    }

    return (
        <div className="page">
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

            <div className="page-content">
                <h1 className="page-header">
                    Стеллажи
                </h1>

                <span className="page-header__counter">
                    Всего стеллажей: {racks.length}
                </span>
                <SearchBar
                    placeholder="Поиск стеллажа..."
                    onSearch={setSearch}
                />

                {isAdmin && (
                    <StorageFormCard
                        title="Создать стеллаж"
                        values={newRack}
                        fields={[
                            {
                                name: "code",
                                label: "Код стеллажа"
                            }
                        ]}
                        onChange={handleRackChange}
                        onSubmit={handleCreateRack}
                        submitText="Создать"
                    />
                )}
                {loading && (
                    <div className="state-card">
                        Loading...
                    </div>
                )}

                {error && (
                    <p>
                        {error}
                    </p>
                )}

                {!loading && (
                    <div className="cards-grid">
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