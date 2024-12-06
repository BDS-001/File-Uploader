const prisma = require('./prismaClient')

async function getFileData(fileId) {
    console.log('fileId in query:', fileId, typeof fileId); // Debug log
    return prisma.file.findUnique({
        where: {
            id: fileId
        },
        select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            title: true,
            mimeType: true,
            extension: true,
            size: true,
            filename: true,
            userId: true,
        }
    })
}

module.exports = {getFileData}