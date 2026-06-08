import { Link } from "react-router-dom"

export default function DocsAdminCard({ document, onDelete }) {
    return (
        <div style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px"
        }}>
            <h3>{document.title}</h3>

            <p>
                Инвентарный номер: {" "}{document.inventory_number}
            </p>
            <p>
                Тема: {" "}{document.subject}
            </p>
            <p>
                Экземпляров: {" "}{document.quantity_total}
            </p>
            <div style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px"
            }}>
                <Link to={`documents/${document.id}`}>
                    Подробнее
                </Link>
                <button onClick={() => onDelete(document.id)}>
                    Удалить
                </button>
            </div>
        </div>
    )
}