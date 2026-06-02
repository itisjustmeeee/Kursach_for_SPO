import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SearchBar from '../../components/bars/SearchBar.jsx'
import Sidebar from '../../components/bars/Sidebar.jsx'
import CellCard from '../../components/docs/CellsCard.jsx'
import { fetchCells } from '../../services/CellService.js'

export default function CellsPage() {
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

    useEffect(() => {
        const loadCells = async () => {
            try {
                setLoading(true)

                const data = await fetchCells({
                    shelf_id: shelf_id,
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
                                Заполненные
                            </option>
                            <option value="avaliable">
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