const prisma = require('./prismaClient')

async function getUserRootFolder(userId) {
    userId = parseInt(userId)
    const folder = await prisma.folder.findFirst({
        where: {
            isRoot: true,
            userId
        },
        select: {
            id: true
        }
    })

    console.log(folder)

    return folder?.id
}

async function uploadFile(data) {
    return prisma.file.create({data})
}

async function addFolder(data) {
    return prisma.folder.create({data})
}

async function getFolderContent(folderId) {
    return prisma.folder.findUnique({
        where: {
            id: folderId
        },
        select: {
            id: true,
            name: true,
            childrenFolders: {
                select: {
                    id: true,
                    name: true,
                    createdAt: true
                }
            },
            files: {
                select: {
                    id: true,
                    title: true,
                    filename: true,
                    mimeType: true,
                    createdAt: true
                }
            }
        }
    })
}

module.exports = {getUserRootFolder,uploadFile, addFolder, getFolderContent}