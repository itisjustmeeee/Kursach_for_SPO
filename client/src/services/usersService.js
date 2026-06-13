import api from "../api/axios.js"

export const fetchUsersInfo = async (params = {}) => {
    const response = await api.get('/users', { params })

    return response.data
}