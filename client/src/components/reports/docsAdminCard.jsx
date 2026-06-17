import { Link } from "react-router-dom"
import "../../assets/styles/Cards/docsAdminCard.scss"

export default function DocsAdminCard({ document, onDelete }) {
    const location = document.document_locations?.[0]

    return (
        <div className="doc-admin-card">
            <div className="doc-admin-card__header">
                <h3 className="doc-admin-card__title">
                    {document.title}
                </h3>
            </div>

            <div className="doc-admin-card__info">
                <p>
                    <strong>Инвентарный номер:</strong> {" "}{document.inventory_number}
                </p>
                <p>
                    <strong>Тема:</strong> {" "}{document.subject}
                </p>
                <p>
                    <strong>Экземпляров:</strong> {" "}{document.quantity_total}
                </p>
            </div>
            <div className="doc-admin-card__actions">
                <Link className="doc-admin-card__link" to={location 
                    ? `/shelves/${location.cells.shelf_id}/cells/${location.cell_id}/documents/${document.id}`
                    : "#"}>
                    Подробнее
                </Link>
                <button className="doc-admin-card__delete" onClick={() => onDelete(document.id)}>
                    Удалить
                </button>
            </div>
        </div>
    )
}