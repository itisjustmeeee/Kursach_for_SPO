import { Link } from "react-router-dom"
import "../../assets/styles/rackCard.scss"

export default function RacksCard({ rack }) {
    return (
        <div className="rack-card">
            <div className="rack-card__content">
                <h3 className="rack-card__title">
                    Стеллаж {rack.code}
                </h3>

                <p className="rack-card__info">
                    Полок: {rack.shelves?.length || 0}
                </p>
            </div>

            <Link className="rack-card__button" to={`/racks/${rack.id}/shelves`}>
                Открыть полки
            </Link>
        </div>
    )
}