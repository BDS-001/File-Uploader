const { uploadFile } = require('../prisma/folderQueries')
const path = require('path');

async function postUploadFile(req, res, next) {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const userId = req.user.id
    const currentFolderId = req.currentFolder.id
    if (!currentFolderId && currentFolderId !== 0) {
        return res.status(400).json({ error: 'No parent folder detected' });
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
        folderId: currentFolderId
    }

    try {
        await uploadFile(fileData)
        return req.currentFolder.root ? res.redirect('/') : res.redirect(`/folder/${currentFolderId}`)
    } catch(err) {
        return next(err);
    }
}

module.exports = {
    postUploadFile
}