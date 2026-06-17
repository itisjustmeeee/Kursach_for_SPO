import { Link } from "react-router-dom"
import "../../assets/styles/Cards/cellCard.scss"

export default function DocumentCard({ document }) {
    const doc = document.documents
    const cell = document.cells

    return (
        <div className="cellCard">
            <div className="cellCard__content">
                <h2 className="cellCard__title">
                    {doc.title}
                </h2>

                <div className="cellCard__info">
                    <p>
                        <span>
                            Инвентарный номер: {doc.inventory_number}
                        </span>
                    </p>

                    <p>
                        Тема: {doc.subject}
                    </p>

                    <p>
                        Всего экземпляров: {doc.quantity_total}
                    </p>

                    <p>
                        Дата поступления: {new Date(doc.created_at).toLocaleDateString("ru-RU")}
                    </p>
                </div>
            </div>

            <Link className="cellCard__button" to={`/shelves/${cell.shelf_id}/cells/${cell.id}/documents/${doc.id}`}>
                Подробнее
            </Link>
        </div>
    )
}