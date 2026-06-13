import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SearchBar from '../../components/bars/SearchBar.jsx'
import Sidebar from '../../components/bars/Sidebar.jsx'
import CellCard from '../../components/docs/CellsCard.jsx'
import StorageFormCard from '../../components/createComponent.jsx'
import { fetchCells, createCell } from '../../services/CellService.js'
import useAuth from '../../hooks/useAuth.js'

export default function CellsPage() {
    const { user } = useAuth()
    const { shelf_id, rack_id } = useParams()
    const [cells, setCells] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")
    const [filters, setFilters] = useState({
        sort: "code",
        order: "asc",
        status: ""
    })

    const [formValues, setFormValues] = useState({
        code: "",
        max_capacity: ""
    })
    const isAdmin = user?.role === "admin" || user?.roles?.includes("admin")

    useEffect(() => {
        const loadCells = async () => {
            try {
                setLoading(true)

                const data = await fetchCells({
                    shelf_id,
                    search,
                    ...filters
                })

                setCells(data)
            } catch (err) {
                setError(
                    err.response?.data?.message || "Ошибка загрузки ячеек"
                )
            } finally {
                setLoading(false)
            }
        }

        loadCells()
    }, [shelf_id, search, filters])

    const handleChange = (name, value) => {
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCreateCell = async (e) => {
        e.preventDefault()

        try {
            await createCell({
                code: formValues.code,
                max_capacity: Number(formValues.max_capacity),
                shelf_id: Number(shelf_id)
            })

            setFormValues({
                code: "",
                max_capacity: ""
            })

        } catch (err) {
            alert(
                err.response?.data?.message || "Ошибка создания ячейки"
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
                    },
                    {
                        value: "fill_percent",
                        label: "По заполненности"
                    },
                    {
                        value: "free_space",
                        label: "По свободному месту"
                    }
                ]}
                extraFilters={
                    <div>
                        <label>
                            Статус
                        </label>
                        <select
                            name='status'
                            value={filters.status}
                            onChange={(e) =>
                                setFilters(prev => ({
                                    ...prev,
                                    status: e.target.value
                                }))
                            }
                        >
                            <option value="">
                                Все
                            </option>
                            <option value="empty">
                                Пустые
                            </option>
                            <option value="filled">
                                Есть место
                            </option>
                            <option value="full">
                                Полностью заполнены
                            </option>
                        </select>
                    </div>
                }
            />
            <div style={{ flex: 1 }}>
                <Link to={`/racks/${rack_id}/shelves`}>
                    К полкам
                </Link>
                <Link to={`/racks`}>
                    К стеллажам
                </Link>
                <h1>
                    Ячейки
                </h1>
                <p>
                    Всего ячеек: {cells.length}
                </p>
                <SearchBar
                    placeholder='Поиск ячейки...'
                    onSearch={setSearch}
                />

                {isAdmin && (
                    <StorageFormCard
                        title="Создать ячейку"
                        fields={[
                            {
                                name: "code",
                                label: "Код ячейки"
                            },
                            {
                                name: "max_capacity",
                                label: "Вместимость",
                                type: "number"
                            }
                        ]}
                        values={formValues}
                        onChange={handleChange}
                        onSubmit={handleCreateCell}
                        submitText='Создать ячейку'
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
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "20px"
                    }}>
                        {cells.map(cell => (
                            <CellCard
                                key={cell.id}
                                cell={cell}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}