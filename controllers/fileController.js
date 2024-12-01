const { getUserRootFolder, uploadFile } = require('../prisma/folderQueries')

async function postUploadFile(req, res) {
    const userId = req.user.id
    const folderId = req.params.id ? parseInt(req.params.id) : null;

    const folder = {id:folderId, root:false}
    if (folder.id === undefined) {
        const rootFolder = await getUserRootFolder(userId)
        folder.id = rootFolder.id
        folder.root = true
    }
    const file = req.file.buffer
    const fileData = {
        title: req.file.originalname,          
        filename: req.file.originalname,       
        mimeType: req.file.mimetype,          
        extension: path.extname(req.file.originalname),
        size: req.file.size,                  
        content: file,             
        userId,               
        folderId
    }
    await uploadFile(fileData)
}

module.exports = {
    postUploadFile
}