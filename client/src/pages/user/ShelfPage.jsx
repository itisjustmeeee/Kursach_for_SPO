import { useEffect, useState, useCallback } from "react"
import { Link, useParams } from "react-router-dom"
import SearchBar from "../../components/bars/SearchBar.jsx"
import Sidebar from "../../components/bars/Sidebar.jsx"
import ShelfCard from "../../components/docs/ShelvesCard.jsx"
import StorageFormCard from "../../components/createComponent.jsx"
import { fetchShelves, createShelf } from "../../services/ShelvesService.js"
import useAuth from "../../hooks/useAuth.js"
import "../../assets/styles/PagesStyle.scss"

export default function ShelvesPage() {
    const { user } = useAuth()
    const { rack_id } = useParams()
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

            const data = await fetchShelves({
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
                    Полки
                </h1>

                <Link className="back-button" to="/racks">
                    К стеллажам
                </Link>

                <span className="page-header__counter">
                    Всего полок: {shelves.length}
                </span>

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
