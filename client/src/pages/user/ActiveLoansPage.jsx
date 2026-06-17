import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import SearchBar from "../../components/bars/SearchBar.jsx"
import Sidebar from "../../components/bars/Sidebar.jsx"
import LoanCard from "../../components/docs/LoanCard.jsx"
import { fetchActiveLoans, returnLoan } from "../../services/loanService.js"
import "../../assets/styles/PagesStyle.scss"

export default function ActiveLoansPage() {
    const [loans, setLoans] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")
    const [filters, setFilters] = useState({
        sort: "issued_at",
        order: "desc",
        overdueOnly: ""
    })

    useEffect(() => {
        const loadLoans = async () => {
            try {
                setLoading(true)

                const data = await fetchActiveLoans({
                    search,
                    ...filters
                })

                setLoans(data)
            } catch (err) {
                setError(
                    err.response?.data?.message || "Ошибка загрузки выдач"
                )
            } finally {
                setLoading(false)
            }
        }

        loadLoans()
    }, [search, filters])

    const handleReturn = async (loan_id) => {
        try {
            await returnLoan(loan_id)

            setLoans(prev => prev.filter(loan => loan.id !== loan_id))
        } catch (err) {
            alert(
                err.response?.data?.message || "Ошибка возврата"
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
                        value: "issued_at",
                        label: "По дате выдачи"
                    },
                    {
                        value: "due_date",
                        label: "По сроку возврата"
                    }
                ]}
                extraFilters={
                    <div>
                        <label>
                            Просроченные
                        </label>
                        <select
                            value={filters.overdueOnly}
                            onChange={e => {
                                setFilters(
                                    prev => ({
                                        ...prev,
                                        overdueOnly: e.target.value
                                    })
                                )
                            }}
                        >
                            <option value="">
                                Все
                            </option>
                            <option value="true">
                                Только просроченные
                            </option>
                        </select>
                    </div>
                }
            />

            <div className="page-content">
                <h1 className="page-header">
                    Активные выдачи
                </h1>

                <Link className="back-button" to="/loans/loan-history">
                    История
                </Link>

                <span className="page-header__counter">
                    Всего: {" "}{loans.length || 0}
                </span>
                <SearchBar
                    placeholder="Поиск по документу или пользователю..."
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

                {!loading && loans.length === 0 && (
                    <p>
                        Активных выдач нет
                    </p>
                )}

                {!loading && loans.length > 0 && (
                    <div className="cards-grid">
                        {loans.map(
                            loan => (
                                <LoanCard
                                    key={loan.id}
                                    loan={loan}
                                    showReturnButton={true}
                                    onReturn={handleReturn}
                                />
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}