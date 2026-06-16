import useAuth from "../../hooks/useAuth.js"
import { useNavigate } from "react-router-dom"
import ProfileCard from "../../components/profile/ProfileCard.jsx"
import "../../assets/styles/ProfilePage.scss"

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
        <div className="profile-page">
            <div className="profile-page__container">
                <h1 className="profile-page__title">
                    Личный кабинет
                </h1>
            
                <ProfileCard user={user} onLogout={handleLogout}/>
            </div>
        </div>
    )
}