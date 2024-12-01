const router = require("express").Router();
const userController = require('../controllers/userController')
const {requireAuthSignedIn} = require('../middleware/requireAuth')
const upload = require('../config/multerConfig')
const fileController = require('../controllers/fileController')

router.get("/", requireAuthSignedIn, userController.getUserContent);
router.get('/folder/:id', requireAuthSignedIn, userController.getUserContent)
router.post('/uploadFile/:id', upload.single('file'), fileController.postUploadFile)

router.get("/signup", userController.getUserSignUp);
router.post("/signup", userController.postUserSignUp);

router.get('/login', userController.getLoginPage)
router.post("/login", userController.postLogIn);
router.get("/log-out", userController.getLogOut);

module.exports = router