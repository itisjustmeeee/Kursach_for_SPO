import api from "../api/axios.js"

export const fetchUsersStats = async () => {
    const response =  await api.get('/users-stats/stats')

    return response.data
}