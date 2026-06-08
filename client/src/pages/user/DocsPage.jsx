import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import SearchBar from "../../components/bars/SearchBar.jsx"
import Sidebar from "../../components/bars/Sidebar.jsx"
import DocumentCard from "../../components/docs/DocumentCard.jsx"
import { fetchDocument } from "../../services/loanService.js"

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
        const loadDocuments = async () => {
            try {
                setLoading(true)

                const data = await fetchDocument({
                    cell_id,
                    search,
                    ...filters
                })

                setDocuments(data.documents)
            } catch (err) {
                setError(err?.response?.data?.message || "Ошибка загрузки документов")
            } finally {
                setLoading(false)
            }
        }

        loadDocuments()
    }, [cell_id, search, filters])

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

            <div style={{ flex: 1 }}>
                <Link to={`/cells/${cell_id}`}>
                    к ячейке
                </Link>

                <h1>
                    Документы
                </h1>

                <p>
                    Всего документов: {documents.length}
                </p>

                <SearchBar
                    placeholder="Поиск документа..."
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

                {!loading && documents.length === 0 && (
                    <p>
                        Документы не найдены
                    </p>
                )}

                {!loading && documents.length > 0 && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "16px"
                    }}>
                        {documents.map(document => (
                            <DocumentCard
                                key={document.id}
                                document={document}
                                cell_id={cell_id}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}