import { useEffect, useState, useCallback } from "react"
import { Link, useParams } from "react-router-dom"
import { fetchDocumentsById } from "../../services/getDocService.js"
import { createLoanRequest } from "../../services/loanService.js"
import api from "../../api/axios.js"
import "../../assets/styles/DocPage.scss"

export default function DocumentPage() {
    const { id, shelf_id, cell_id } = useParams()
    const [document, setDocument] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [requestLoading, setRequestLoading] = useState(false)
    const [canDownload, setCanDownload] = useState(false)

    const loadDocument = useCallback(async () => {
        try {
            setLoading(true)

            const data = await fetchDocumentsById(id)
            setDocument(data)

            const access = await api.get(`/documents/${id}/access`)
            setCanDownload(access.data.canDownload)
        } catch (err) {
            setError(
                err.response?.data?.message || "Ошибка загрузки документа"
            )
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        const wrapper = async () => {
            loadDocument()
        }

        wrapper()
    }, [loadDocument])

    const handleRequest = async () => {
        try {
            setRequestLoading(true)

            await createLoanRequest(id)

            alert("Заявка отправлена. Дождитесь одобрения")

            const access = await api.get(`/documents/${id}/access`)
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
        <div className="document-page">
            <div className="document-info-card">

                <h2>{document.title}</h2>

                <div className="document-info">
                    <p><strong>Инвентарный номер:</strong> {document.inventory_number}</p>
                    <p><strong>Тема:</strong> {document.subject}</p>
                    <p><strong>Количество:</strong> {document.quantity_total}</p>
                    <p>
                        <strong>Дата поступления:</strong>
                        {" "}
                        {new Date(document.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="document-preview-card">
                <h3>Содержимое документа</h3>

                {document.file_path ? (
                    <>
                        {document.mime_type?.includes("pdf") ? (
                            <iframe
                                className="document-pdf"
                                src={`http://localhost:5000${document.file_path}`}
                                title={document.title}
                                width="100%"
                                height="600"
                            />
                        ) : document.mime_type?.startsWith("image/") ? (
                            <img
                                className="document-image"
                                src={`http://localhost:5000${document.file_path}`}
                                alt={document.title}
                            />
                        ) : (
                            <div>
                                <p>
                                    Предпросмотр недоступен для данного типа файла
                                </p>
                                <p>
                                    Файл: {document.file_name}
                                </p>
                            </div>
                        )}

                        <div className="document-action-card">
                            {canDownload ? (
                                <a
                                    className="document-download-btn"
                                    href={`http://localhost:5000${document.file_path}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    download
                                >
                                    Скачать документ
                                </a>
                            ) : (
                                <p className="document-access-warning">
                                    Скачивание доступно только после одобрения заявки
                                </p>
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
                    <button className="document-request-btn" onClick={handleRequest} disabled={requestLoading}>
                        {requestLoading ? "Отправка..." : "Подать заявку на выдачу"}
                    </button>
                )}
                <Link className="document-back-button " to={`/shelves/${shelf_id}/cells/${cell_id}/documents`}>
                    К списку документов
                </Link>
            </div>

        </div>
    )
}