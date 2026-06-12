import { useEffect, useState, useCallback } from "react"
import { Link, useSearchParams } from "react-router-dom"
import SearchBar from "../../components/bars/SearchBar.jsx"
import Sidebar from "../../components/bars/Sidebar.jsx"
import ShelfCard from "../../components/docs/ShelvesCard.jsx"
import StorageFormCard from "../../components/createComponent.jsx"
import { fecthShelves, createShelf } from "../../services/ShelvesService.js"
import useAuth from "../../hooks/useAuth.js"

export default function ShelvesPage() {
    const { user } = useAuth()
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

    const [formValues, setFormValues] = useState({
        code: "",
        rack_id: rack_id || ""
    })

    const isAdmin = user?.role === "admin" || user?.roles?.includes("admin")

    
    const loadData = useCallback(async () => {
        try {
            setLoading(true)

            const data = await fecthShelves({
                rack_id,
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
    }, [rack_id, search, filters])

    useEffect(() => {
        const wrapper = async () => {
            loadData()
        }

        wrapper()
    }, [loadData])

    const handleChange = (name, value) => {
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await createShelf({
                ...formValues,
                rack_id
            })

            setFormValues({
                code: "",
                rack_id
            })

            await loadData()
        } catch (err) {
            alert(
                err.response?.data?.message || "Ошибка создания полки"
            )
        }
    }

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

                {isAdmin && (
                    <StorageFormCard
                        title="Создать полку"
                        fields={[
                            {
                                name: "code",
                                label: "Код полки"
                            }
                        ]}
                        values={formValues}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitText="Создать полку"
                    />
                )}

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
