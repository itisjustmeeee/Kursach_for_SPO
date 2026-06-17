import "../../assets/styles/Cards/StatsCard.scss"

export default function StatsCard({ title, value }) {
    return (
        <div className="stats-card">
            <span className="stats-card__title">
                {title}
            </span>
            <div className="stats-card__value">
                {value}
            </div>
        </div>
    )
}