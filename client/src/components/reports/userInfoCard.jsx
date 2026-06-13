
export default function UserCard({ user }) {
    return (
        <div style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px"
        }}>
            <h3>
                {user.username}
            </h3>

            <p>
                ФИО: {" "}{user.last_name}{" "}{user.first_name}{" "}{user.middle_name}
            </p>
            <p>
                Телефон: {" "}{user.phone}
            </p>
            <p>
                Почта: {" "}{user.email}
            </p>
            <p>
                Отдел: {" "}{user.department}
            </p>
        </div>
    )
}