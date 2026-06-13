import api from "../api/axios.js"

export const fetchHistoryLoans = async (params = {}) => {
    const response = await api.get(`/loans/history`, { params })

    return response.data
}