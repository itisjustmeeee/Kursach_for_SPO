import api from "../api/axios.js"

export const createDocument = async (data) => {
    const response = await api.post("/api/documents", data)

    return response.data
}

export const uploadDocumentFile = async (document_id, file) => {
    const formData = new FormData()

    formData.append("file", file)

    const response = await api.post(`/api/documents/${document_id}/upload`, formData)

    return response.data
}

export const createDocumentLoaction = async (data) => {
    const response = await api.post("/api/locations", data)

    return response.data
}