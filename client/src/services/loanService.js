import api from "../api/axios.js"

export const fetchDocument = async (params = {}) => {
    const response = await api.get("/api/documents", { params })

    return response.data
}