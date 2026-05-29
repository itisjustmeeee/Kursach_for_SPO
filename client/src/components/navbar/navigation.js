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
        path: '/history',
        roles: [ROLES.ADMIN, ROLES.USER]
    }
]

export const adminNavigation = [
    {
        label: 'Добавить документ',
        path: '/documents/create',
        roles: [ROLES.ADMIN]
    },
    {
        label: 'Сведения',
        roles: [ROLES.ADMIN],
        dropdown: [
            {
                label: 'Пользователи',
                path: '/users'
            },
            {
                label: 'Документы',
                path: '/documents'
            },
            {
                label: 'Архив',
                path: '/archive'
            }
        ]
    },
    {
        label: 'Заявки',
        path: '/applications',
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