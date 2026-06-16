import { useEffect, useState, useCallback } from "react"
import Sidebar from "../../components/bars/Sidebar.jsx"
import SearchBar from "../../components/bars/SearchBar.jsx"
import LoanRequestCard from "../../components/requestCard.jsx"
import { fetchPendingLoans, approveLoan, rejectLoan } from "../../services/loanRequestService.js"

export default function LoanRequestPage() {
    const [loans, setLoans] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")
    const [filters, setFilters] = useState({
        sort: "issued_at",
        order: "desc"
    })

    const loadLoans = useCallback(async () => {
        try {
            setLoading(true)

            const data = await fetchPendingLoans()

            setLoans(data)
        } catch (err) {
            setError(
                err.response?.data?.message || "Ошибка загрузки заявок"
            )
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        const wrapper = async () => {
            loadLoans()
        }

        wrapper()
    }, [loadLoans])

    const handleApprove = async (id) => {
        try {
            await approveLoan(id)

            await loadLoans()
        } catch (err) {
            alert(
                err.response?.data?.message || "Ошибка одобрения заявки"
            )
        }
    }

    const handleReject = async (id) => {
        try {
            await rejectLoan(id)

            await loadLoans()
        } catch (err) {
            alert(
                err.response?.data?.message || "Ошибка отклонения заявки"
            )
        }
    }

    const filteredLoans = loans.filter(loan => {
        const text = search.toLowerCase()

        return (
            loan.documents?.title?.toLowerCase().includes(text) || 
            loan.users?.last_name?.toLowerCase().includes(text) ||
            loan.users?.first_name?.toLowerCase().includes(text) ||
            loan.users?.username?.toLowerCase().includes(text)
        )
    }).sort((a, b) => {
        switch (filters.sort) {
            case "issued_at":
                return filters.order === "asc" 
                    ? new Date(a.issued_at) - new Date(b.issued_at)
                    : new Date(b.issued_at) - new Date(a.issued_at)
            default:
                return 0
        }
    })

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
                        label: "По дате создания"
                    }
                ]}
            />

            <div style={{ flex: 1 }}>
                <h1>Заявки на выдачу документов</h1>

                <p>Всего заявок: {filteredLoans.length}</p>

                <SearchBar
                    placeholder="Поиск по пользователю или документу..."
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

                {!loading && filteredLoans.length === 0 && (
                    <p>
                        Нет заявок
                    </p>
                )}

                {!loading && filteredLoans.length > 0 && (
                    <div style={{
                        display: "grid",
                        gap: "16px",
                        marginTop: "20px"
                    }}>
                        {filteredLoans.map(loan => (
                            <LoanRequestCard
                                key={loan.id}
                                loan={loan}
                                onApprove={handleApprove}
                                onReject={handleReject}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}