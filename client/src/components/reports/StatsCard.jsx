export default function StatsCard({ title, value }) {
    return (
        <div style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px"
        }}>
            <h3>
                {title}
            </h3>
            <h3>
                {value}
            </h3>
        </div>
    )
}