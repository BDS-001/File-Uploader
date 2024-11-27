const router = require("express").Router();
const userController = require('../controllers/userController')
const {requireAuthSignedIn} = require('../middleware/requireAuth')

router.get("/", requireAuthSignedIn, userController.getHomepage);

router.get("/signup", userController.getUserSignUp);
router.post("/signup", userController.postUserSignUp);

router.get('/login', userController.getLoginPage)
router.post("/login", userController.postLogIn);
router.get("/log-out", userController.getLogOut);

module.exports = router