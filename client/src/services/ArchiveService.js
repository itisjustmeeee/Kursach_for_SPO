import api from "../api/axios.js"

export const fetchArchiveStats = async () => {
    const response = await api.get("/api/archive/stats")

    return response.data
}