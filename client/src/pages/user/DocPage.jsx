import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { fetchDocumentsById } from "../../services/getDocService.js"
import { createLoanRequest } from "../../services/loanService.js"
import api from "../../api/axios.js"

export default function DocumentPage() {
    const { id, rack_id, shelf_id, cell_id } = useParams()
    const [document, setDocument] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [requestLoading, setRequestLoading] = useState(false)
    const [canDownload, setCanDownload] = useState(false)

    useEffect(() => {
        const loadDocument = async () => {
            try {
                setLoading(true)

                const data = await fetchDocumentsById(id)
                setDocument(data)

                const access = await api.get(`/api/documents/${id}/access`)
                setCanDownload(access.data.canDownload)
            } catch (err) {
                setError(
                    err.response?.data?.message || "Ошибка загрузки документа"
                )
            } finally {
                setLoading(false)
            }
        }

        loadDocument()
    }, [id])

    const handleRequest = async () => {
        try {
            setRequestLoading(true)

            await createLoanRequest(id)

            alert("Заявка отправлена. Дождитесь одобрения")

            const access = await api.get(`/api/documents/${id}/access`)
            setCanDownload(access.data.canDownload)
        } catch (err) {
            alert(err.response?.data?.message || "Ошибка подачи заявки")
        } finally {
            setRequestLoading(false)
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (!document) return <p>Документ не найден</p>

    return (
        <div style={{ padding: "20px" }}>

            <h1>{document.title}</h1>
            <p>Инвентарный номер: {document.inventory_number}</p>
            <p>Тема: {document.subject}</p>
            <p>Количество: {document.quantity_total}</p>
            <p>
                Дата поступления:
                {" "}
                {new Date(document.created_at).toLocaleDateString()}
            </p>

            <div style={{
                marginTop: "20px",
                padding: "10px",
                boder: "1px solid #ccc",
                borderRadius: "8px"
            }}>
                <h3>Содержимое документа</h3>

                {document.file_path ? (
                    <>
                        {document.mime_type?.includes("pdf") ? (
                            <iframe
                                src={canDownload? document.file_path : ""}
                                title={document.title}
                                width="100%"
                                height="600"
                                style={{
                                    boder: "1px solid #ccc",
                                    borderRadius: "8px"
                                }} 
                            />
                        ) : document.mime_type?.startsWith("image/") ? (
                            <img
                                src={canDownload ? document.file_path : ""}
                                alt={document.title}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "600px",
                                    objectFit: "contain"
                                }}
                            />
                        ) : (
                            <div>
                                <p>
                                    Предпросмотр недоступен для данного типа файла
                                </p>
                                {canDownload && <p>Файл: {document.file_name}</p>}
                            </div>
                        )}

                        <div>
                            {canDownload ? (
                                <a href={document.file_path} target="_blank" rel="noreferrer">
                                    скачать
                                </a>
                            ) : (
                                <p style={{ color: "red" }}>Скачивание доступно только после одобрения заявки</p>
                            )}
                        </div>
                    </>
                ) : (
                    <p>
                        Файл отсутствует
                    </p>
                )}
            </div>

            <div style={{ marginTop: "20px" }}>
                {!canDownload && (
                    <button onClick={handleRequest} disabled={requestLoading}>
                        {requestLoading ? "Отправка..." : "Подать заявку на выдачу"}
                    </button>
                )}
                <Link to={`/racks/${rack_id}/shelves/${shelf_id}/cells/${cell_id}/documents`} style={{ marginLeft: "10px" }}>
                    К списку документов
                </Link>
            </div>

        </div>
    )
}