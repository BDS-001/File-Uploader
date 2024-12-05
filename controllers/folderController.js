const { addFolder } = require('../prisma/folderQueries');

async function postAddFolder(req, res, next) {
    const userId = req.user.id
    const currentFolder = req.currentFolder
    const parentFolderId = currentFolder.id

    if (!parentFolderId && parentFolderId !== 0) {
        return res.status(404).json({ error: 'parent folder not found' });
    }

    const folderData = {
        name: req.body.folderName,
        parentFolderId,
        userId
    }

    try {
        await addFolder(folderData)
        return parentFolderId === currentFolder.root ? res.redirect('/') : res.redirect(`/folder/${parentFolderId}`)
    } catch(err) {
        return next(err);
    }
}

module.exports = {
    postAddFolder
}