import { Link } from "react-router-dom"
import "../../assets/styles/Cards/cellCard.scss"

export default function CellCard({ cell }) {

    return (
        <div className="cellCard">
            <div className="cellCard__content">
                <h3 className="cellCard__title">
                    Ячейка {cell.code}
                </h3>

                <div className="cellCard__info">
                    <p>Вместимость: {cell.max_capacity}</p>

                    <p>Заполнено: {cell.current_load}</p>

                    <p>Свободно: {cell.free_space}</p>

                    <p>
                        <span>
                            Заполнение: {cell.fill_percent}%
                        </span>
                    </p>
                </div>
                <div className="cellCard__fillbar">
                    <div className="cellCard__fillbar-value" style={{ width: `${cell.fill_percent}` }} />
                </div>
            </div>

            <Link className="cellCard__button" to={`/shelves/${cell.shelf_id}/cells/${cell.id}/documents`}>
                Документы
            </Link>
        </div>
    )
}