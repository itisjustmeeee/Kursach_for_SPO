import api from "../api/axios.js"

export const createDocument = async (data) => {
    const response = await api.post("/documents", data)

    return response.data
}

export const uploadDocumentFile = async (document_id, file) => {
    const formData = new FormData()

    formData.append("file", file)

    const response = await api.post(`/documents/${document_id}/upload`, formData)

    return response.data
}

export const createDocumentLoaction = async (data) => {
    const response = await api.post("/locations", data)

    return response.data
}