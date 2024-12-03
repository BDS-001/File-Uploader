const { getUserRootFolder, uploadFile } = require('../prisma/folderQueries')
const path = require('path');

async function postUploadFile(req, res, next) {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const userId = req.user.id
    const folderId = req.params.id ? parseInt(req.params.id) : null;

    const folder = {id:folderId, root:false}
    if (folder.id === null) {
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
        folderId: folder.id
    }

    try {
        await uploadFile(fileData)
        return folder.root ? res.redirect('/') : res.redirect(`/folder/${folder.id}`)
    } catch(err) {
        return next(err);
    }
}

module.exports = {
    postUploadFile
}