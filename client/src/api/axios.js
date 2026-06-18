import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const original = error.config

        const authRoutes = [
            "/auth/login",
            "/auth/register",
            "/auth/refresh"
        ]

        if (error.response?.status === 401 && !original._retry && !authRoutes.some(route => original.url?.includes(route))) {
            original._retry = true

            try {
                const res = await axios.get(
                    'http://localhost:5000/api/auth/refresh',
                    { withCredentials: true }
                )

                const newToken = res.data.accessToken

                localStorage.setItem("token", newToken)

                original.headers.Authorization = `Bearer ${newToken}`

                return api(original)
            } catch (err) {
                console.log(err)
                localStorage.removeItem("token")
                window.location.href = "/login"
            }
        }

        return Promise.reject(error)
    }
)

export default api