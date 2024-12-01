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

async function uploadFile(data) {
    return prisma.file.create({data})
}

module.exports = {getUserRootFolder,uploadFile}