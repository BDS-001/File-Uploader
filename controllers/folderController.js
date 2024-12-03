const { getUserRootFolder, addFolder } = require('../prisma/folderQueries');

async function postAddFolder(req, res, next) {
    const userId = req.user.id
    const parentFolderId = req.params.id ? parseInt(req.params.id) : await getUserRootFolder(userId);
    const isRoot = `${parentFolderId}` === req.params.id
    if (parentFolderId === null || parentFolderId === undefined) {
        return res.status(404).json({ error: 'parent folder not found' });
    }
    const folderData = {
        name: req.body.folderName,                  
        parentFolderId,
        userId
    }

    try {
        await addFolder(folderData)
        return isRoot ? res.redirect('/') : res.redirect(`/folder/${parentFolderId}`)
    } catch(err) {
        return next(err);
    }
}

module.exports = {
    postAddFolder
}