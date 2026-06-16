import useAuth from '../hooks/useAuth.js'
import profileImage from '../assets/profile_image.jpg'
import { Link } from 'react-router-dom'
import "../assets/styles/ProfileMenu.scss"

export default function ProfileMenu() {
    const {user, logout} = useAuth()

    return (
        <div className='profile-menu'>
            <button className='profile-menu__button'>
                <img
                    src={profileImage}
                    alt='avatar'
                    className='profile-menu__avatar'
                />
                <span className='profile-menu__name '>{user?.username}</span>
            </button>
            <div className='profile-menu__dropdown'>
                <Link to="/profile">
                    Профиль
                </Link>
                <button className='dropdown_menu_text' onClick={logout}>
                    Выход
                </button>
            </div>
        </div>
    )
}