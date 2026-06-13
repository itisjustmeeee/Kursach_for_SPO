import { Link } from "react-router-dom"

export default function CellCard({ cell }) {

    return (
        <div className="cellCard">
            <h3>Ячейка {cell.code}</h3>

            <p>Вместимость: {cell.max_capacity}</p>

            <p>Заполнено: {cell.current_load}</p>

            <p>Свободно: {cell.free_space}</p>

            <p>Заполнение: {cell.fill_percent}%</p>

            <div className="actions">
                <Link to={`/shelves/${cell.shelf_id}/cells/${cell.id}/documents`}>
                    Документы
                </Link>
            </div>
        </div>
    )
}