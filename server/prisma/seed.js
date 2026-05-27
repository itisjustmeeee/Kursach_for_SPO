import prisma from "../config/prisma.js"
import bcrypt from 'bcrypt'

async function main() {

    await prisma.roles.createMany({
        data: [
            { name: 'user' },
            { name: 'admin' }
        ],
        skipDuplicates: true
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
        ],
        skipDuplicates: true
    })

    const roles = await prisma.roles.findMany()
    const permissions = await prisma.permissions.findMany()

    const getRole = (name) => roles.find(role => role.name === name)
    const getPerm = (name) => permissions.find(permission => permission.name === name)

    const adminPerms = permissions.map(permission => permission.id)

    const userPerms = [
        'view_document',
        'request_return_document'
    ].map(name => {
        const permission = getPerm(name)

        if (!permission) {
            throw new Error(`Permission ${name} not found`)
        }

        return permission.id
    })

    const adminRole = getRole('admin')
    const userRole = getRole('user')

    if (!adminRole || !userRole) {
        throw new Error('Roles not found')
    }

    await prisma.role_permissions.createMany({
        data: [
            ...adminPerms.map(permission_id => ({
                role_id: adminRole.id,
                permission_id
            })),

            ...userPerms.map(permission_id => ({
                role_id: userRole.id,
                permission_id
            }))
        ],
        skipDuplicates: true
    })

    const existingAdmin = await prisma.users.findUnique({
        where: {
            email: 'itisjustmesas@gmail.com'
        }
    })

    if (!existingAdmin) {
        const password_hash = await bcrypt.hash('admin1328sas', 10)
        const admin = await prisma.users.create({
            data: {
                username: 'Firstadmin',
                first_name: 'Olga',
                last_name: 'Guzairova',
                middle_name: 'Rinatovna',
                email: 'itisjustmesas@gmail.com',
                phone: '+79686885084',
                password_hash,
                department: 'administration'
            }
        })

        await prisma.user_roles.create({
            data: {
                user_id: admin.id,
                role_id: adminRole.id
            }
        })
    }

    console.log('seed complited')
}

main().catch(err => {
    console.error(err)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})
