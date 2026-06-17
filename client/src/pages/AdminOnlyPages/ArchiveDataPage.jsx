import { useState, useEffect } from "react"
import StatsCard from "../../components/reports/StatsCard.jsx"
import { fetchArchiveStats } from "../../services/ArchiveService.js"
import "../../assets/styles/PagesStyle.scss"

export default function ArchiveStatsPage() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const loadStats = async () => {
            try {
                setLoading(true)

                const data = await fetchArchiveStats()

                setStats(data)
            } catch (err) {
                setError(
                    err.response?.data?.message || "Ошибка загрузки статистики"
                )
            } finally {
                setLoading(false)
            }
        }

        loadStats()
    }, [])

    if (loading) {
        return <div className="state-card">Loading...</div>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className="page">
            <div className="page-content">
                <h1 className="page-header">
                    Сведения об архиве
                </h1>

                <h2 className="page__title">
                    Структура архива
                </h2>

                <div className="cards-grid">
                    <StatsCard
                        title="Стеллажей"
                        value={stats.totalRacks}
                    />
                    <StatsCard
                        title="Полок"
                        value={stats.totalShelves}
                    />
                    <StatsCard
                        title="Ячеек"
                        value={stats.totalCells}
                    />
                </div>

                <h2 className="page__title">
                    Документы
                </h2>

                <div className="cards-grid">
                    <StatsCard
                        title="Документов"
                        value={stats.totalDocuments}
                    />
                    <StatsCard
                        title="Экземпляров"
                        value={stats.totalCopies}
                    />
                </div>

                <h2 className="page__title">
                    Выдача документов
                </h2>

                <div className="cards-grid">
                    <StatsCard
                        title="Активные выдачи"
                        value={stats.activeLoans}
                    />
                    <StatsCard
                        title="Просроченные выдачи"
                        value={stats.overdueLoans}
                    />
                </div>

                <h2 className="page__title">
                    Пустые элементы архива
                </h2>

                <div className="cards-grid">
                    <StatsCard
                        title="Пустые стеллажи"
                        value={stats.emptyRacks}
                    />
                    <StatsCard
                        title="Пустые полки"
                        value={stats.emptyShelves}
                    />
                    <StatsCard
                        title="Пустые ячейки"
                        value={stats.emptyCells}
                    />
                </div>

                <h2 className="page__title">
                    Максимально заполненная ячейка
                </h2>

                <div className="cards-grid">
                    <StatsCard
                        title="Заполненность"
                        value={stats.mostLoadedCell?.fill_percent ? `${stats.mostLoadedCell.fill_percent}%` : "Нет данных"}
                    />
                    <StatsCard
                        title="Код ячейки"
                        value={stats.mostLoadedCell?.code || "-"}
                    />
                </div>

                <h2 className="page__title">
                    Невостребованные документы
                </h2>

                <div className="cards-grid">
                    <StatsCard
                        title="Количество"
                        value={stats.unusedDocumentsCount}
                    />
                </div>
            </div>
        </div>
    )
}