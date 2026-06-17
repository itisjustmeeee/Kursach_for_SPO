import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import SearchBar from "../../components/bars/SearchBar.jsx"
import Sidebar from "../../components/bars/Sidebar.jsx"
import DocumentCard from "../../components/docs/DocumentCard.jsx"
import { fetchCellDocuments } from "../../services/cellDocumentsService.js"
import "../../assets/styles/PagesStyle.scss"

export default function DocumentsPage() {
    const { cell_id } = useParams()
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")
    const [filters, setFilters] = useState({
        sort: "title",
        order: "asc",
        subject: ""
    })

    useEffect(() => {
        if (!cell_id) return
        const loadDocuments = async () => {
            try {
                setLoading(true)

                const data = await fetchCellDocuments({
                    cell_id: Number(cell_id),
                    search,
                    ...filters
                })

                setDocuments(data)
            } catch (err) {
                setError(err?.response?.data?.message || "Ошибка загрузки документов")
            } finally {
                setLoading(false)
            }
        }

        loadDocuments()
    }, [cell_id, search, filters])

    return (
        <div className="page">
            <Sidebar
                filters={filters}
                setFilters={setFilters}
                sortOptions={[
                    {
                        value: "title",
                        label: "По названию"
                    },
                    {
                        value: "inventory_number",
                        label: "По инвентарному номеру"
                    },
                    {
                        value: "created_at",
                        label: "По дате"
                    }
                ]}
                extraFilters={
                    <div>
                        <label>
                            Тема
                        </label>

                        <input
                            type="text"
                            value={filters.subject}
                            onChange={(e) => 
                                setFilters(prev => ({
                                    ...prev,
                                    subject: e.target.value
                                }))
                            }
                        />
                    </div>
                }
            />

            <div className="page-content">
                <h1 className="page-header">
                    Документы
                </h1>

                <Link className="back-button" to={`/racks`}>
                    к стеллажам
                </Link>

                <span className="page-header__counter">
                    Всего документов: {documents?.length || 0}
                </span>

                <SearchBar
                    placeholder="Поиск документа..."
                    onSearch={setSearch}
                />

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

                {!loading && documents?.length === 0 && (
                    <p>
                        Документы не найдены
                    </p>
                )}

                {!loading && documents?.length > 0 && (
                    <div className="cards-grid">
                        {documents.map(document => (
                            <DocumentCard
                                key={document.id}
                                document={document}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}