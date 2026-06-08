import { useState, useEffect } from "react"
import StatsCard from "../../components/reports/StatsCard.jsx"
import { fetchArchiveStats } from "../../services/ArchiveService.js"

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
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div>
            <h1>Сведения об архиве</h1>

            <h2>Структура архива</h2>

            <div>
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

            <h2>Документы</h2>
            <div>
                <StatsCard
                    title="Документов"
                    value={stats.totalDocuments}
                />
                <StatsCard
                    title="Экземпляров"
                    value={stats.totalCopies}
                />
            </div>

            <h2>Выдача документов</h2>

            <div>
                <StatsCard
                    title="Активные выдачи"
                    value={stats.activeLoans}
                />
                <StatsCard
                    title="Просроченные выдачи"
                    value={stats.overdueLoans}
                />
            </div>

            <h2>Пустые элементы архива</h2>

            <div>
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

            <h2>Максимально заполненная ячейка</h2>

            <div>
                <StatsCard
                    title="Заполненность"
                    value={stats.mostLoadedCell?.fill_percent ? `${stats.mostLoadedCell.fill_percent}%` : "Нет данных"}
                />
                <StatsCard
                    title="Код ячейки"
                    value={stats.mostLoadedCell?.code || "-"}
                />
            </div>

            <h2>Невостребованные документы</h2>

            <div>
                <StatsCard
                    title="Количество"
                    value={stats.unusedDocumentsCount}
                />
            </div>
        </div>
    )
}