import { useState, useEffect } from "react"
import StatsCard from "../../components/reports/StatsCard.jsx"
import UserCard from "../../components/reports/userInfoCard.jsx"
import SearchBar from "../../components/bars/SearchBar.jsx"
import { fetchUsersStats } from "../../services/usersStatsService.js"
import { fetchUsersInfo } from "../../services/usersService.js"
import "../../assets/styles/PagesStyle.scss"

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
        return <div className="state-card">Loading...</div>
    }

    return (
        <div className="page">
            <div className="page-content">
                <h1 className="page-header">
                    Сведения о пользователях архива
                </h1>

                <SearchBar
                    placeholder="Поиск пользователя..."
                    onSearch={setSearch}
                />

                <div className="cards-grid">
                    <StatsCard 
                        title="Всего пользователей" 
                        value={stats.totalUsers} 
                    />
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

                <h2 className="page__title">
                    Пользователи
                </h2>

                <div className="cards-grid">
                    {filteredUsers.map(user => (
                        <UserCard
                            key={user.id}
                            user={user}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}