const router = require("express").Router();
const userController = require('../controllers/userController')
const {requireAuthSignedIn} = require('../middleware/requireAuth')
const upload = require('../config/multerConfig')
const fileController = require('../controllers/fileController')
const folderController = require('../controllers/folderController')
const getCurrentFolder = require('../middleware/getCurrentFolder')

router.get("/", requireAuthSignedIn, getCurrentFolder, userController.getUserContent);
router.get('/folder/:id', requireAuthSignedIn, getCurrentFolder, userController.getUserContent)

router.post('/uploadFile/:id', requireAuthSignedIn, getCurrentFolder, upload.single('file'), fileController.postUploadFile)
router.post('/uploadFile/', requireAuthSignedIn, getCurrentFolder, upload.single('file'), fileController.postUploadFile)
router.post('/newFolder/:id', requireAuthSignedIn, getCurrentFolder, folderController.postAddFolder)
router.post('/newFolder', requireAuthSignedIn, getCurrentFolder, folderController.postAddFolder)

router.get('/fileDetails/:id', requireAuthSignedIn, fileController.getFileDetails)

router.get("/signup", userController.getUserSignUp);
router.post("/signup", userController.postUserSignUp);

router.get('/login', userController.getLoginPage)
router.post("/login", userController.postLogIn);
router.get("/log-out", userController.getLogOut);

module.exports = router