const {getUserRootFolder} = require('../prisma/folderQueries')

async function getCurrentFolder(req, res, next) {
    if (!req.user) {
        return next();
    }

    try {
        const userId = req.user.id
        const folderId = req.params.id ? parseInt(req.params.id) : null;

        const currentFolder = {id:folderId, root:false}
        if (currentFolder.id === null) {
            const rootFolderId = await getUserRootFolder(userId)
            currentFolder.id = rootFolderId
            currentFolder.root = true
        }

        req.currentFolder = currentFolder;
        next();

    } catch (error) {
        console.error('Error in getCurrentFolder middleware:', error);
        next(error);
    }
}

module.exports = getCurrentFolder;