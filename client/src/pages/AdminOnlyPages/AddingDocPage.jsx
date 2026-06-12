import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DocumentCreateCard from "../../components/createDocumentCard.jsx"
import { createDocument, uploadDocumentFile, createDocumentLoaction } from "../../services/addDocumentService.js"
import { fetchCells } from "../../services/CellService.js"

export default function CreateDocumentPage() {
    const navigate = useNavigate()
    const [cells, setCells] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedFile, setSelectedFile] = useState(null)
    const [values, setValues] = useState({
        title: "",
        subject: "",
        inventory_number: "",
        quantity_total: "",
        cell_id: ""
    })

    useEffect(() => {
        const loadCells = async () => {
            try {
                const data = await fetchCells()

                setCells(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        loadCells()
    }, [])

    const handleChange = (field, value) => {
        setValues(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const createdDocument = await createDocument({
                title: values.title,
                subject: values.subject,
                inventory_number: values.inventory_number,
                quantity_total: Number(values.quantity_total)
            })

            await createDocumentLoaction({
                document_id: createdDocument.id,
                cell_id: Number(values.cell_id),
                quantity: Number(values.quantity_total)
            })

            if (selectedFile) {
                await uploadDocumentFile(
                    createdDocument.id,
                    selectedFile
                )
            }

            alert("Документ успешно добавлен")

            navigate('/admin/documents')
        } catch (err) {
            alert(
                err.response?.data?.message || "Ошибка создания документа"
            )
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div style={{
            padding: "20px"
        }}>
            <h1>Добавление документа</h1>

            <DocumentCreateCard
                values={values}
                cells={cells}
                onChange={handleChange}
                onFileChange={handleFileChange}
                onSubmit={handleSubmit}
            />
        </div>
    )
}