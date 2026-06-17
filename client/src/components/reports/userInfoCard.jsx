import "../../assets/styles/Cards/userCard.scss"
export default function UserCard({ user }) {
    return (
        <div className="user-card">
            <div className="user-card__header">
                <h3 className="user-card__name">
                    {user.username}
                </h3>
            </div>

            <div className="user-card__info">
                <span className="user-card__department">
                        Отдел: {" "}{user.department}
                </span>
                <p>
                    <strong>ФИО:</strong> {" "}{user.last_name}{" "}{user.first_name}{" "}{user.middle_name || ""}
                </p>
                <p>
                    <strong>Телефон:</strong> {" "}{user.phone}
                </p>
                <p>
                    <strong>Почта:</strong> {" "}{user.email}
                </p>
            </div>
        </div>
    )
}