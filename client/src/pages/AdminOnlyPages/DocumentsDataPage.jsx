import { useEffect, useState, useCallback } from "react"
import SearchBar from "../../components/bars/SearchBar.jsx"
import Sidebar from '../../components/bars/Sidebar.jsx'
import StatsCard from "../../components/reports/StatsCard.jsx"
import DocsAdminCard from "../../components/reports/docsAdminCard.jsx"
import { fetchDocuments, fetchDocumentsStats, fetchUnusedDocuments, deleteDocument } from "../../services/documentsStatsService.js"

export default function DocumentsStatsPage() {
    const [stats, setStats] = useState(null)
    const [documents, setDocuments] = useState([])
    const [search, setSearch] = useState("")
    const [filters, setFilters] = useState({
        sort: "title",
        order: "asc",
        unusedMonths: ""
    })
    const [loading, setLoading] = useState(true)
    const loadDocuments = useCallback(async () => {
        try {
            setLoading(true)
            
            let data

            if (filters.unusedMonths) {
                data = await fetchUnusedDocuments(filters.unusedMonths)
            } else {
                data = await fetchDocuments({
                    search,
                    sort: filters.sort,
                    order: filters.order
                })
            }
            
            setDocuments(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [search, filters])

    useEffect(() => {
        const loadPage = async () => {
            const statsData = await fetchDocumentsStats()
            setStats(statsData)
            await loadDocuments()
        }

        loadPage()
    }, [loadDocuments])

    useEffect(() => {
        const wrapper = async () => {
            await loadDocuments()
        }
        wrapper()
    }, [loadDocuments])

    const handleDelete = async (id) => {
        if (!window.confirm("Удалить документ")) {
            return
        }

        await deleteDocument(id)
        await loadDocuments()
    }

    if (loading && !stats) {
        return <p>Loading...</p>
    }

    return (
        <div style={{
            display: "flex",
            gap: "20px"
        }}>
            <Sidebar
                filters={filters}
                setFilters={setFilters}
                extraFilters={
                    <div>
                        <label>
                            Невостребованные
                        </label>
                        <select
                            value={filters.unusedMonths}
                            onChange={e => setFilters(prev => ({
                                ...prev,
                                unusedMonths: e.target.value
                            }))}
                        >
                            <option value="">
                                Все
                            </option>
                            <option value="3">
                                Не выдавались 3 месяца 
                            </option>
                            <option value="6">
                                Не выдавались 6 месяца
                            </option>
                            <option value="12">
                                Не выдавались 12 месяцев
                            </option>
                        </select>
                    </div>
                }
            />
            <div style={{ flex: 1 }}>
                <h1>Сведения о документах</h1>

                {stats && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                        gap: "16px",
                        marginBottom: "30px"
                    }}>
                        <StatsCard
                            title="Документов"
                            value={stats.totalDocuments}
                        />
                        <StatsCard
                            title="Экземпляров"
                            value={stats.totalCopies}
                        />
                        <StatsCard
                            title="С файлами"
                            value={stats.documentsWithFiles}
                        />
                        <StatsCard
                            title="Выдано"
                            value={stats.issuedDocuments}
                        />
                    </div>
                )}

                <SearchBar
                    placeholder="Поиск документа..."
                    onSearch={setSearch}
                />
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "16px",
                    marginTop: "20px"
                }}>
                    {documents.map(document => (
                        <DocsAdminCard
                            key={document.id}
                            document={document}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}