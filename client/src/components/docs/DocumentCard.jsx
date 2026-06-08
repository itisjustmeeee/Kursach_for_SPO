import { Link } from "react-router-dom"

export default function DocumentCard({ document, cell_id }) {
    return (
        <div>
            <h2>{document.title}</h2>

            <p>
                Инвентарный номер: {document.inventory_number}
            </p>

            <p>
                Тема: {document.subject}
            </p>

            <p>
                Всего экземпляров: {document.quantity_total}
            </p>

            <p>
                Дата поступления: {new Date(document.created_at).toLocaleDateString("ru-RU")}
            </p>

            <Link to={`cells/${cell_id}/documents/${document.id}`}>
                Подробнее
            </Link>
        </div>
    )
}