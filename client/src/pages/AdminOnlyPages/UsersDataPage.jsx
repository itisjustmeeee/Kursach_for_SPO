import { useState, useEffect } from "react"
import StatsCard from "../../components/reports/StatsCard.jsx"
import UserCard from "../../components/reports/userInfoCard.jsx"
import SearchBar from "../../components/bars/SearchBar.jsx"
import { fetchUsersStats } from "../../services/usersStatsService.js"
import { fetchUsersInfo } from "../../services/usersService.js"

export default function UsersDataPage() {
    const [stats, setStats] = useState(null)
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    statsData,
                    usersData
                ] = await Promise.all([
                    fetchUsersStats(),
                    fetchUsersInfo()
                ])

                setStats(statsData)
                setUsers(usersData?.users || usersData || [])
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    const filteredUsers = users.filter(user => user.username?.toLowerCase().includes(search.toLowerCase()))

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Сведения о пользователях архива</h1>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "16px",
                marginBottom: "30px"
            }}>
                {stats && (
                    <>
                        <StatsCard title="Всего пользователей" value={stats.totalUsers} />
                    </>
                )}
                <StatsCard
                    title="Активных пользователей"
                    value={stats.usersWithActiveLoans}
                />
                <StatsCard
                    title="С просрочками"
                    value={stats.overdueUsers}
                />
                <StatsCard
                    title="Без выдач"
                    value={stats.usersWithoutLoans}
                />
                <StatsCard
                    title="Самый активный пользователь"
                    value={stats.mostActiveUser
                        ? `${stats.mostActiveUser.first_name} ${stats.mostActiveUser.last_name}`
                        : "-"
                    }
                />
            </div>

            <h2>Пользователи</h2>

            <SearchBar
                placeholder="Поиск пользователя..."
                onSearch={setSearch}
            />
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "16px",
                marginTop: "20px"
            }}>
                {filteredUsers.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                    />
                ))}
            </div>
        </div>
    )
}