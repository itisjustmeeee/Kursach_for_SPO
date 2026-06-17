import "../assets/styles/Cards/requestCard.scss"

export default function LoanRequestCard({loan, onApprove, onReject}) {
    return (
        <div className="request-card">
            <div className="request-card__header">
                <h3 className="request-card__title">
                    {loan.documents.title}
                </h3>
            </div>

            <div className="request-card__info">
                <p>
                    <span>
                        Пользователь: {" "}{loan.users.last_name}{" "}{loan.users.first_name}{" "}{loan.users.middle_name}
                    </span>
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
            </div>
            <div className="request-card__action">
                <button className="request-card__button-approve" onClick={() => onApprove(loan.id)}>
                    Одобрить
                </button>
                <button className="request-card__button-reject" onClick={() => onReject(loan.id)}>
                    Отклонить
                </button>
            </div>
        </div>
    )
}