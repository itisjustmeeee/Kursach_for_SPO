import "../assets/styles/StorageFormCard.scss"

export default function StorageFormCard({title, fields, values, onChange, onSubmit, submitText = "Создать"}) {
    return (
        <div className="storage-form-card">
            <h3 className="storage-form-card__title">
                {title}
            </h3>

            <form className="storage-form-card__form" onSubmit={onSubmit}>
                {fields.map(field => (
                    <div
                        key={field.name}
                        className="storage-form-card__field"
                    >
                        <label>{field.label}</label>

                        <input
                            type={field.type || "text"}
                            value={values[field.name] || ""}
                            onChange={(e) => onChange(field.name, e.target.value)}
                        />
                    </div>
                ))}
                <button className="storage-form-card__button" type="submit">
                    {submitText}
                </button>
            </form>
        </div>
    )
}