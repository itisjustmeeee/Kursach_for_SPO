import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import SearchBar from "../../components/bars/SearchBar.jsx"
import Sidebar from "../../components/bars/Sidebar.jsx"
import LoanCard from "../../components/docs/LoanCard.jsx"
import { fetchHistoryLoans } from "../../services/HistoryLoanService.js"
import "../../assets/styles/PagesStyle.scss"

export default function HistoryLoansPage() {
    const [loans, setLoans] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")
    const [filters, setFilters] = useState({
        sort: "returned_at",
        order: "desc",
        subject: ""
    })

    useEffect(() => {
        const loadHistory = async () => {
            try {
                setLoading(true)

                const data = await fetchHistoryLoans({
                    search,
                    ...filters
                })

                setLoans(data)
            } catch (err) {
                setError(
                    err.response?.data?.message || "Ошибка при загрузке истории"
                )
            } finally {
                setLoading(false)
            }
        }

        loadHistory()
    }, [search, filters])

    return (
        <div className="page">
            <Sidebar
                filters={filters}
                setFilters={setFilters}
                sortOptions={[
                    {
                        value: "returned_at",
                        label: "По возврату"
                    },
                    {
                        value: "issued_at",
                        label: "По выдаче"
                    },
                    {
                        value: "title",
                        label: "По названию"
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
                            onChange={(e) => setFilters(prev => ({
                                ...prev,
                                subject: e.target.value
                            }))}
                        />
                    </div>
                }
            />

            <div className="page-content">
                <h1 className="page-header">
                    История выдач
                </h1>

                <Link className="back-button" to="/loans/loan-active">
                    Активные выдачи
                </Link>

                <span className="page-header__counter">
                    Всего записей: {" "}{loans?.length || 0}
                </span>
                <SearchBar
                    placeholder="Поиск документа или пользователя..."
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

                {!loading && loans?.length === 0 && (
                    <p>
                        История пуста
                    </p>
                )}

                {!loading && loans?.length > 0 && (
                    <div className="cards-grid">
                        {loans.map(loan => (
                            <LoanCard
                                key={loan.id}
                                loan={loan}
                                showReturnedDate
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}