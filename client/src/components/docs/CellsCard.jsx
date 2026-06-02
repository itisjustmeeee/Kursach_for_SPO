import { Link } from "react-router-dom"

export default function CellCard({ cell }) {

    const rackId = cell?.shelves?.racks?.id
    const shelfId = cell?.shelves?.id

    return (
        <div className="cellCard">
            <h3>Ячейка {cell.code}</h3>

            <p>Вместимость: {cell.max_capacity}</p>

            <p>Заполнено: {cell.current_load}</p>

            <p>Свободно: {cell.free_space}</p>

            <p>Заполнение: {cell.fill_percent}%</p>

            <div className="actions">
                <Link to={`/cells/${cell.id}/documents`}>
                    Документы
                </Link>
                {shelfId && (
                    <Link to={`/shelves/${shelfId}`}>
                        К полке
                    </Link>
                )}
                {rackId && (
                    <Link to={`/racks/${rackId}`}>
                        К стеллажу
                    </Link>
                )}
            </div>
        </div>
    )
}