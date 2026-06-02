import useAuth from "../../hooks/useAuth.js"
import { useNavigate } from "react-router-dom"
import ProfileCard from "../../components/profile/ProfileCard.jsx"

export default function ProfilePage() {
    const { user, logout } = useAuth()

    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    if (!user) {
        return <p>Loading...</p>
    }

    return (
        <div className="">
            <ProfileCard user={user} onLogout={handleLogout}/>
        </div>
    )
}