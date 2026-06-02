import profileImage from '../../assets/profile_image.jpg'

export default function ProfileCard({ user, onLogout }) {
    return (
        <div>
            <div className=''>
                <img
                    src={profileImage}
                    alt="profile"
                    className=''
                />
            </div>
            <div className=''>
                <h2>{user.username}</h2>

                <p><b>Email</b> {user.email}</p>
                <p><b>Имя</b> {user.first_name}</p>
                <p><b>Фамилия</b> {user.last_name}</p>
                <p><b>Отчество</b> {user.middle_name}</p>
                <p><b>Телефон</b> {user.phone}</p>
                <p><b>Отдел</b> {user.department}</p>

                <button onClick={onLogout}>
                    Выйти
                </button>
            </div>
        </div>
    )
}

