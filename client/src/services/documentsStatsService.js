import api from "../api/axios.js"

export const fetchDocumentsStats = async () => {
    const response = await api.get('/api/documents-stats/stats')

    return response.data
}

export const fetchDocuments = async (params = {}) => {
    const response = await api.get('/api/documents', { params })

    return response.data
}

export const fetchUnusedDocuments = async (months) => {
    const response = await api.get('/api/documents/unused', {
        params: {
            months
        }
    })

    return response.data
}

export const deleteDocument = async (id) => {
    const response = await api.delete(`/api/documents/${id}`)

    return response.data
}