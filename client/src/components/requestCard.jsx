export default function LoanRequestCard({loan, onApprove, onReject}) {
    return (
        <div style={{
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "8px"
        }}>
            <h3>{loan.documents.title}</h3>

            <p>
                Пользователь: {" "}{loan.users.last_name}{" "}{loan.users.first_name}{" "}{loan.users.middle_name}
            </p>
            <p>
                Количество: {" "}{loan.quantity}
            </p>
            <p>
                До: {" "}{loan.due_date ? new Date(loan.due_date).toLocaleDateString() : "Не назначена"}
            </p>
            <p>
                Подана: {" "}{new Date(loan.issued_at).toLocaleDateString()}
            </p>
            <div style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px"
            }}>
                <button onClick={() => onApprove(loan.id)}>
                    Одобрить
                </button>
                <button onClick={() => onReject(loan.id)}>
                    Отклонить
                </button>
            </div>
        </div>
    )
}