const prisma = require('./prismaClient')

async function addUser({email, username, name, password}) {
    return prisma.user.create({
        data: {
            email, 
            username, 
            name, 
            password,
            folders: {
                create: {
                    name: 'Root',
                    isRoot: true
                }
            } 
        },
        select: {
            id: true,
            email: true,
            name: true,
            username: true,
            createdAt: true
          }
    })
}

module.exports = {addUser}