export const ROLES = {
    ADMIN: 'admin',
    USER: 'user'
}

export const baseNavigation = [
    {
        label: 'Главная',
        path: '/',
        roles: [ROLES.ADMIN, ROLES.USER]
    },
    {
        label: 'Стеллажи',
        path: '/racks',
        roles: [ROLES.ADMIN, ROLES.USER]
    },
    {
        label: 'История',
        path: '/loans/loan-history',
        roles: [ROLES.ADMIN, ROLES.USER]
    },
    {
        label: 'Активные',
        path: '/loans/loan-active',
        roles: [ROLES.ADMIN, ROLES.USER]
    }
]

export const adminNavigation = [
    {
        label: 'Добавить документ',
        path: '/admin/documents/create',
        roles: [ROLES.ADMIN]
    },
    {
        label: 'Сведения',
        roles: [ROLES.ADMIN],
        dropdown: [
            {
                label: 'Пользователи',
                path: '/admin/users'
            },
            {
                label: 'Документы',
                path: '/admin/documents'
            },
            {
                label: 'Архив',
                path: '/admin/archive'
            }
        ]
    },
    {
        label: 'Заявки',
        path: '/admin/loans/loan-requests',
        roles: [ROLES.ADMIN]
    }
]

export const profileNavigation = [
    {
        label: 'Профиль',
        path: '/profile',
        roles: [ROLES.ADMIN, ROLES.USER]

    },
    {
        label: 'Выход',
        action: 'logout',
        roles: [ROLES.ADMIN, ROLES.USER]
    }
]