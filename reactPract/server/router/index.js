const Router = require('express').Router
const expressValidator = require('express-validator')
const router = new Router()
const authController = require('../controller/auth-controller')
const usersController = require('../controller/users-controller')
const {body} = require('express-validator')
const authMiddleware = require('../middleware/auth-middleware')
const changeController = require('../controller/change-controller')
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() });

// authorization endpoints
router.post('/autoLogin', authMiddleware, authController.autoLogin)
router.post('/registration', authController.createAccount)
router.delete('/registration', authController.deleteAccount)
router.post('/login', authController.login)
router.delete('/login', authController.logout)

// verification endpoints
router.post('/verifyAccount', authController.verifyAccount)
router.post('/confirmVerification', authController.confirmVerification)

// edit profile endpoints
router.put('/toggleFollowing/:id', authMiddleware, changeController.toggleFollowing)
router.put('/changeStatus', authMiddleware, changeController.changeStatus)
router.put('/edit', upload.fields([{name: 'avatar'}, {name: 'profilePhoto'}]), changeController.editProfile)

// get user endpoints
router.get('/usersAutocomplete/:user', usersController.autoComplete) 
router.get('/users', authMiddleware, usersController.getUsers) // працює на божому слові, мені страшно там шось фіксити
router.get('/image/:id', usersController.getImage)
router.get('/profile/:id', usersController.getProfile)

module.exports = router