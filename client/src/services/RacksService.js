import api from "../api/axios.js"

export const fetchRacks = async (params = {}) => {
    const response = await api.get("/api/racks", { params })

    return response.data
}