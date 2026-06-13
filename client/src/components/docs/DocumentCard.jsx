import { Link } from "react-router-dom"

export default function DocumentCard({ document }) {
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

            <Link to={`/documents/${document.id}`}>
                Подробнее
            </Link>
        </div>
    )
}