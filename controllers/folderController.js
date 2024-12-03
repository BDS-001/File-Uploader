const { getUserRootFolder, addFolder } = require('../prisma/folderQueries');

async function postAddFolder(req, res, next) {
    const userId = req.user.id
    const rootFolderId = await getUserRootFolder(userId);
    const parentFolderId = req.params.id ? parseInt(req.params.id) : rootFolderId;

    if (!parentFolderId) {
        return res.status(404).json({ error: 'parent folder not found' });
    }

    console.log(req.body.folderName)
    const folderData = {
        name: req.body.folderName,
        parentFolderId,
        userId
    }

    try {
        await addFolder(folderData)
        return parentFolderId === rootFolderId ? res.redirect('/') : res.redirect(`/folder/${parentFolderId}`)
    } catch(err) {
        return next(err);
    }
}

module.exports = {
    postAddFolder
}