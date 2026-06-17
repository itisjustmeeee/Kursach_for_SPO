import "../assets/styles/Cards/createCard.scss"

export default function DocumentCreateCard({values, onChange, onFileChange, onSubmit, cells}) {
    return (
        <div className="document-card-create">
            <h2 className="document-card-create__title">
                Добавление документа
            </h2>

            <form className="document-card-create__form" onSubmit={onSubmit}>
                <div className="document-card-create__group">
                    <label>Название</label>
                    <input
                        type="text"
                        value={values.title}
                        onChange={(e) => onChange("title", e.target.value)}
                    />
                    <label>Тема</label>
                    
                    <input
                        type="text"
                        value={values.subject}
                        onChange={(e) => onChange("subject", e.target.value)}
                    />
                    <label>Инвентарный номер</label>
                    <input
                        type="text"
                        value={values.inventory_number}
                        onChange={(e) => onChange("inventory_number", e.target.value)}
                    />
                    <label>Количество экземпляров</label>
                    <input
                        type="number"
                        value={values.quantity_total}
                        onChange={(e) => onChange("quantity_total", e.target.value)}
                    />

                    <label>Ячейка</label>
                    <select
                        value={values.cell_id}
                        onChange={(e) => onChange("cell_id", e.target.value)}
                    >
                        <option value="">
                            Выберите ячейку
                        </option>
                        {cells.map(cell => (
                            <option
                                key={cell.id}
                                value={cell.id}
                            >
                                {cell.code}
                            </option>
                        ))}
                    </select>
                    <label>Файл документа</label>
                    <input
                        type="file"
                        onChange={onFileChange}
                    />
                </div>
                <button className="document-card-create__button" type="submit">
                    Добавить документ
                </button>
            </form>
        </div>
    )
}