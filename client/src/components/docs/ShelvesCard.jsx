import { Link } from "react-router-dom"

export default function ShelfCard({ shelf }) {
    return (
        <div>
            <h3>Полка {shelf.code}</h3>

            <p>
                Стеллаж: {shelf.racks?.code}
            </p>

            <p>
                Ячеек: {shelf.cells?.length || 0}
            </p>

            <Link to={`/racks/${shelf.rack_id}/shelves/${shelf.id}/cells`}>
                Открыть ячейки
            </Link>
        </div>
    )
}