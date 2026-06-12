import api from "../api/axios.js"

export const fetchRacks = async (params = {}) => {
    const response = await api.get("/api/racks", { params })

    return response.data
}

export const fetchRacksById = async (id) => {
    const response = await api.get(`/api/racks/${id}`)

    return response.data
}

export const createRack = async (data) => {
    const response = await api.post("/api/racks", data)

    return response.data
}

export const updateRack = async (id, data) => {
    const response = await api.put(`/api/racks/${id}`, data)

    return response.data
}

export const deleteRack = async (id) => {
    const response = await api.delete(`/api/racks/${id}`)

    return response.data
}