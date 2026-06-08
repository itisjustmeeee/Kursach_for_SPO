import { useState, useEffect, Link } from "react"
import SearchBar from "../../components/bars/SearchBar.jsx"
import Sidebar from "../../components/bars/Sidebar.jsx"
import LoanCard from "../../components/docs/loanCard.jsx"
import { fetchActiveLoans, returnLoan } from "../../services/loanService.js"

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
        <div style={{
            display: "flex",
            gap: "20px"
        }}>
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

            <div style={{ flex: 1 }}>
                <div style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "15px"
                }}>
                    <Link to="/loans/history">
                        История
                    </Link>
                </div>

                <h1>
                    Активные выдачи
                </h1>

                <p>
                    Всего: {" "}{loans.length}
                </p>
                <SearchBar
                    placeholder="Поиск по документу или пользователю..."
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

                {!loading && loans.length === 0 && (
                    <p>
                        Активных выдач нет
                    </p>
                )}

                {!loading && loans.length > 0 && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                        gap: "16px"
                    }}>
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