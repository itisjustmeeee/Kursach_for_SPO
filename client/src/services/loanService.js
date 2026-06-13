import api from "../api/axios.js"

export const fetchActiveLoans = async (params = {}) => {
    const response = await api.get("/loans/active", { params })

    return response.data
}

export const returnLoan = async (loan_id) => {
    const response = await api.patch(
        `/loans/${loan_id}/return`
    )

    return response.data
}

export const createLoanRequest = async (document_id) => {
    const response = await api.post('/loans/request', {
        document_id
    })

    return response.data
}