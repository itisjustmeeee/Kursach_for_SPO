import { Link } from "react-router-dom"

export default function DocumentCard({ document }) {
    const doc = document.documents
    const cell = document.cells

    return (
        <div>
            <h2>{doc.title}</h2>

            <p>
                Инвентарный номер: {doc.inventory_number}
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

            <Link to={`/shelves/${cell.shelf_id}/cells/${cell.id}/documents/${doc.id}`}>
                Подробнее
            </Link>
        </div>
    )
}