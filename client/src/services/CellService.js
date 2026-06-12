import api from "../api/axios.js"

export const fetchCells = async (shelf_id) => {
    const response = await api.get("/api/cells", {
        params: {
            shelf_id: shelf_id
        }
    })

    return response.data
}

export const fetchCellsById = async (id) => {
    const response = await api.get(`/api/cells/${id}`)

    return response.data
}

export const createCell = async (data) => {
    const response = await api.post("/api/cells", data)

    return response.data
}

export const updateCell = async (id, data) => {
    const response = await api.put(`/api/cells/${id}`, data)

    return response.data
}

export const deleteCell = async (id) => {
    const response = await api.delete(`/api/cells/${id}`)

    return response.data
}