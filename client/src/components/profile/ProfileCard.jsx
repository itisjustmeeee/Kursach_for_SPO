import profileImage from '../../assets/profile_image.jpg'
import "../../assets/styles/Cards/profileCard.scss"

export default function ProfileCard({ user, onLogout }) {
    return (
        <div className='profile-card'>
            <div className='profile-card__avatar-section'>
                <img
                    src={profileImage}
                    alt="profile"
                    className='profile-card__avater'
                />
            </div>
            <div className='profile-card__info'>
                <h2 className='profile-card__name'>
                    {user.username}
                </h2>

                <div className='profile-card__details'>
                    <p><b>Email:</b> {user.email}</p>
                    <p><b>Имя:</b> {user.first_name}</p>
                    <p><b>Фамилия:</b> {user.last_name}</p>
                    <p><b>Отчество:</b> {user.middle_name}</p>
                    <p><b>Телефон:</b> {user.phone}</p>
                    <p><b>Отдел:</b> {user.department}</p>
                </div>

                <button className='profile-card__logout' onClick={onLogout}>
                    Выйти
                </button>
            </div>
        </div>
    )
}

