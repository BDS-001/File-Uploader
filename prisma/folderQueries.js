const prisma = require('./prismaClient')

async function getUserRootFolder(userId) {
    return prisma.folder.findFirst({
        where: {
            isRoot: true,
            userId
        },
        select: {
            id: true
        }
    })
}

module.exports = {getUserRootFolder}