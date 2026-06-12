export default function DocumentCreateCard({values, onChange, onFileChange, onSubmit, cells}) {
    return (
        <div style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            maxWidth: "700px"
        }}>
            <h2>Добавление документа</h2>

            <form onSubmit={onSubmit}>
                <div>
                    <label>Название</label>
                    <input
                        type="text"
                        value={values.title}
                        onChange={(e) => onChange("title", e.target.value)}
                    />
                </div>
                <div>
                    <label>Тема</label>
                    
                    <input
                        type="text"
                        value={values.subject}
                        onChange={(e) => onChange("subject", e.target.value)}
                    />
                </div>
                <div>
                    <label>Инвентарный номер</label>
                    <input
                        type="text"
                        value={values.inventory_number}
                        onChange={(e) => onChange("inventory_number", e.target.value)}
                    />
                </div>
                <div>
                    <label>Количество экземпляров</label>
                    <input
                        type="number"
                        value={values.quantity_total}
                        onChange={(e) => onChange("quantity_total", e.target.value)}
                    />
                </div>
                <div>
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
                </div>
                <div>
                    <label>Файл документа</label>
                    <input
                        type="file"
                        onChange={onFileChange}
                    />
                </div>
                <button type="submit">
                    Добавить документ
                </button>
            </form>
        </div>
    )
}