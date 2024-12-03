const router = require("express").Router();
const userController = require('../controllers/userController')
const {requireAuthSignedIn} = require('../middleware/requireAuth')
const upload = require('../config/multerConfig')
const fileController = require('../controllers/fileController')
const folderController = require('../controllers/folderController')

router.get("/", requireAuthSignedIn, userController.getUserContent);
router.get('/folder/:id', requireAuthSignedIn, userController.getUserContent)

router.post('/uploadFile/:id', requireAuthSignedIn, upload.single('file'), fileController.postUploadFile)
router.post('/uploadFile/', requireAuthSignedIn, upload.single('file'), fileController.postUploadFile)
router.post('/newFolder/:id', requireAuthSignedIn, folderController.postAddFolder)
router.post('/newFolder', requireAuthSignedIn, folderController.postAddFolder)

router.get("/signup", userController.getUserSignUp);
router.post("/signup", userController.postUserSignUp);

router.get('/login', userController.getLoginPage)
router.post("/login", userController.postLogIn);
router.get("/log-out", userController.getLogOut);

module.exports = router