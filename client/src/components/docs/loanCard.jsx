import { Link } from "react-router-dom"
import "../../assets/styles/Cards/loanCard.scss"

export default function LoanCard({ loan, onReturn, showReturnButton = false, showReturnedDate = false }) {
    console.log("LOAN =", loan)
    const overDue = loan.status === "issued" && !loan.returned_at && new Date(loan.due_date) < new Date()    
    const location = loan.documents.document_locations?.[0]

    return (
        <div className="loan-card">
            <div className="loan-card__content">
                <h3 className="loan-card__title">
                    {loan.documents.title}
                </h3>

                <div className="loan-card__info">
                    <p>
                        <span>
                            Инвентарный номер: {" "}{loan.documents.inventory_number}
                        </span>
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
                        Статус: {" "}{overDue ? 'overdue' : loan.status}
                    </p>
                </div>
            </div>

            <div className="loan-card__miltiple-button">
                {location ? (
                    <Link
                        className="loan-card__button"
                        to={`/shelves/${location.cells.shelf_id}/cells/${location.cell_id}/documents/${loan.document_id}`}
                    >
                        Документ
                    </Link>
                ) : (
                    <span>Местоположение не найдено</span>
                )}
                {showReturnButton && (
                    <button
                        className="loan-card__return"
                        onClick={() => onReturn?.(loan.id)}
                    >
                        Вернуть
                    </button>
                )}
            </div>
        </div>
    )
}