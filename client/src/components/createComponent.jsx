export default function StorageFormCard({title, fields, values, onChange, onSubmit, submitText = "Создать"}) {
    return (
        <div style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "20px"
        }}>
            <h3>{title}</h3>

            <form onSubmit={onSubmit}>
                {fields.map(field => (
                    <div
                        key={field.name}
                        style={{
                            marginBottom: "10px"
                        }}
                    >
                        <label>{field.label}</label>

                        <input
                            type={field.type || "text"}
                            value={values[field.name] || ""}
                            onChange={(e) => onChange(field.name, e.target.value)}
                        />
                    </div>
                ))}
                <button type="submit">
                    {submitText}
                </button>
            </form>
        </div>
    )
}