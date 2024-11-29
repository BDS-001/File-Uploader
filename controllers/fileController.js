const { getUserRootFolder } = require('../prisma/folderQueries')

async function postUploadFile(req, res) {
    const userId = req.user.id
    const folderId = req.params.id ? parseInt(req.params.id) : null;

    const folder = {id:folderId, root:false}
    if (folder.id === undefined) {
        const rootFolder = await getUserRootFolder(userId)
        folder.id = rootFolder.id
        folder.root = true
    }
}