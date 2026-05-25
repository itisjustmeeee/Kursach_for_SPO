import prisma from "../config/prisma"

await prisma.roles.createMany({
    data: [
        { name: 'user' },
        { name: 'admin' }
    ]
})

await prisma.permissions.createMany({
    data: [
        { name: 'create_document' },
        { name: 'delete_document' },
        { name: 'upload_documents' },
        { name: 'update_document' },
        { name: 'manage_locations' },
        { name: 'view_document' },
        { name: 'issue_document' },
        { name: 'request_return_document' },
        { name: 'view_users' }
    ]
})

const roles = await prisma.roles.findMany()
const permissions = await prisma.permissions.findMany()

const getRole = (name) => roles.find(r => r.name === name)
const getPerm = (name) => permissions.find(p => p.name === name)

const adminPerms = permissions.map(p => p.id)
const userPerms = [
    'view_document',
    'request_return_document'
].map(getPerm).map(p => p.id)

await prisma.role_permissions.createMany({
    data: [
        ...adminPerms.map(permId => ({
            role_id: getRole('admin').id,
            permission_id: permId
        })),

        ...userPerms.map(permId => ({
            role_id: getRole('user').id,
            permission_id: permId
        }))
    ]
})

const adminRole = await prisma.roles.findUnique({
    where: { name: 'admin' }
})

const admin = await prisma.users.create({
    data: {
        username: 'Firstadmin',
        first_name: 'Olga',
        last_name: 'Guzairova',
        middle_name: 'Rinatovna',
        email: 'itisjustmesas@gmail.com',
        phone: '+79686885084',
        password_hash: 'admin_password_hash',
        department: 'administration'
    }
})

await prisma.user_roles.create({
    data: {
        user_id: admin.id,
        role_id: adminRole.id
    }
})

