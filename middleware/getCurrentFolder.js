const {getUserRootFolder} = require('../prisma/folderQueries')

async function getCurrentFolder(req, res, next) {
    if (!req.user) {
        return next();
    }
    try {
        const userId = req.user.id;
        const folderId = req.params.id ? parseInt(req.params.id) : null;
        console.log('Parsed folderId in middleware:', folderId, typeof folderId); // Debug log

        const currentFolder = {id:folderId, root:false};
        if (currentFolder.id === null) {
            const rootFolderId = await getUserRootFolder(userId);
            currentFolder.id = rootFolderId;
            currentFolder.root = true;
        }
        console.log('currentFolder in middleware:', currentFolder); // Debug log
        req.currentFolder = currentFolder;
        next();
    } catch (error) {
        console.error('Error in getCurrentFolder middleware:', error);
        next(error);
    }
}

module.exports = getCurrentFolder;