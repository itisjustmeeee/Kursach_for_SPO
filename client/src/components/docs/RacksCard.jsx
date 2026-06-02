import { Link } from "react-router-dom"

export default function RacksCard({ rack }) {
    return (
        <div>
            <h3>Стеллаж {rack.code}</h3>

            <p>Полок: {rack.shelves?.length || 0}</p>

            <Link to={`/racks/${rack.id}/shelves`}>
                Открыть полки
            </Link>
        </div>
    )
}