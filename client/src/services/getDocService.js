import api from "../api/axios.js"

export const fetchDocumentsById = async (id) => {
    const response = await api.get(`/documents/${id}`)

    return response.data
}