const prisma = require('./prismaClient')

async function getUserRootFolder(userId) {
    const folder = prisma.folder.findFirst({
        where: {
            isRoot: true,
            userId
        },
        select: {
            id: true
        }
    })

    return folder?.id
}

async function uploadFile(data) {
    return prisma.file.create({data})
}

async function addFolder(data) {
    return prisma.folder.create({data})
  }

module.exports = {getUserRootFolder,uploadFile, addFolder}