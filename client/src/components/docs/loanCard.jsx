import { Link } from "react-router-dom"

export default function LoanCard({ loan, onReturn, showReturnButton = false, showReturnedDate = false }) {
    const overDue = loan.status === "issued" && !loan.returned_at && new Date(loan.due_date) < new Date()

    return (
        <div>
            <h3>
                {loan.documents.title}
            </h3>

            <p>
                Инвентарный номер: {" "}{loan.documents.inventory_number}
            </p>
            <p>
                Пользователь: {" "}{loan.users.last_name}{" "}{loan.users.first_name}
            </p>
            <p>
                Отдел: {" "}{loan.users.department}
            </p>
            <p>
                Количество: {" "}{loan.quantity}
            </p>
            <p>
                Дата выдачи: {" "}{new Date(loan.issued_at).toLocaleDateString()}
            </p>
            <p>
                Вернуть до: {" "}{new Date(loan.due_date).toLocaleDateString()}
            </p>
            {showReturnedDate && loan.returned_at && (
                <p>
                    Возвращен: {" "}{new Date(loan.returned_at).toLocaleDateString()}
                </p>
            )}
            <p>
                Статус: {" "}{overDue ? 'Просрочен' : loan.status}
            </p>
            <div style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px"
            }}>
                <Link to={`/documents/${loan.document_id}`}>
                    Документ
                </Link>
                {showReturnButton && (
                    <button
                        onClick={() => onReturn?.(loan.id)}
                    >
                        Вернуть
                    </button>
                )}
            </div>
        </div>
    )
}