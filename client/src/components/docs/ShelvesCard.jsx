import { Link } from "react-router-dom"
import "../../assets/styles/Cards/shelfCard.scss"

export default function ShelfCard({ shelf }) {
    return (
        <div className="shelf-card">
            <div className="shelf-card__content">
                <h3 className="shelf-card__title">
                    Полка {shelf.code}
                </h3>

                <div className="shelf-card__info">
                    <p>
                        <span>
                            Стеллаж: {shelf.racks?.code}
                        </span>
                    </p>

                    <p>
                        Ячеек: {shelf.cells?.length || 0}
                    </p>
                </div>
            </div>

            <Link className="shelf-card__button" to={`/racks/${shelf.rack_id}/shelves/${shelf.id}/cells`}>
                Открыть ячейки
            </Link>
        </div>
    )
}