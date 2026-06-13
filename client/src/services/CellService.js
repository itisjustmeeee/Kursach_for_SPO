import api from "../api/axios.js"

export const fetchCells = async (params = {}) => {
    const response = await api.get("/cells", { params })

    return response.data
}

export const fetchCellsById = async (id) => {
    const response = await api.get(`/cells/${id}`)

    return response.data
}

export const createCell = async (data) => {
    const response = await api.post("/cells", data)

    return response.data
}

export const updateCell = async (id, data) => {
    const response = await api.put(`/cells/${id}`, data)

    return response.data
}

export const deleteCell = async (id) => {
    const response = await api.delete(`/cells/${id}`)

    return response.data
}