import api from "../api/axios.js"

export const fetchCellDocuments = async (cell_id) => {
    const response = await api.get(`/api/cells/${cell_id}/documents`)

    return response.data
}