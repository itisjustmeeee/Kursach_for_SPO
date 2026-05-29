import useAuth from '../hooks/useAuth.js'
import profileImage from '../assets/profile_image.jpg'
import { Link } from 'react-router-dom'

export default function ProfileMenu() {
    const {user, logout} = useAuth()

    return (
        <div>
            <button>
                <img
                    src={user?.avatar || profileImage}
                    alt=''
                    className=''
                />
                <span>{user?.username}</span>
            </button>
            <div className=''>
                <Link to="/profile">Профиль</Link>
                <button onClick={logout}>
                    Выход
                </button>
            </div>
        </div>
    )
}