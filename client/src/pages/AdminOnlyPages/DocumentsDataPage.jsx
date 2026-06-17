import { useEffect, useState, useCallback } from "react"
import SearchBar from "../../components/bars/SearchBar.jsx"
import Sidebar from '../../components/bars/Sidebar.jsx'
import StatsCard from "../../components/reports/StatsCard.jsx"
import DocsAdminCard from "../../components/reports/docsAdminCard.jsx"
import { fetchDocuments, fetchDocumentsStats, fetchUnusedDocuments, deleteDocument } from "../../services/documentsStatsService.js"
import "../../assets/styles/PagesStyle.scss"

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
                setDocuments(Array.isArray(data) ? data : [])
            } else {
                data = await fetchDocuments({
                    search,
                    ...filters
                })

                setDocuments(data.documents || [])
            }
            
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

    const handleDelete = async (id) => {
        if (!window.confirm("Удалить документ")) {
            return
        }

        await deleteDocument(id)
        await loadDocuments()
    }

    if (loading && !stats) {
        return <div className="state-card">Loading...</div>
    }

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
                        value: "subject",
                        label: "По теме"
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
            <div className="page-content">
                <h1 className="page-header">
                    Сведения о документах
                </h1>

                <SearchBar
                    placeholder="Поиск документа..."
                    onSearch={setSearch}
                />

                <div className="cards-grid">               
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

                <h2 className="page__title">
                    Документы
                </h2>

                <div className="cards-grid">
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