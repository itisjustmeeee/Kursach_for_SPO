import api from "../api/axios.js"

export const fetchCells = async (params = {}) => {
    const response = await api.get("/api/cells", {
        params
    })

    return response.data
}