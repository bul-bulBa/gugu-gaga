import { Router } from 'express'
import authController from '../controller/auth-controller.js'
import usersController from '../controller/users-controller.js'
import authMiddleware from '../middleware/auth-middleware.js'
import changeController from '../controller/change-controller.js'
import postController from '../controller/post-controller.js'
import multer from 'multer'

const router = new Router()
const upload = multer({ storage: multer.memoryStorage() });

// authorization endpoints
router.post('/autoLogin', authMiddleware, authController.autoLogin)
router.post('/registration', authController.createAccount)
router.delete('/registration', authController.deleteAccount)
router.post('/login', authController.login)
router.delete('/login', authController.logout)

// refresh access token
router.post('/refresh', authController.refresh)

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
router.get('/filter', usersController.filter)

// post endpoints
router.post('/post', upload.fields([{name: 'file'}]), postController.newPost)
router.delete('/post/:id', postController.deletePost)
router.get('/post', postController.getPosts)
// router.put('/post', postController.getUserPosts) 
router.post('/toggleLike', postController.toggleLikes)
router.post('/reply', postController.replyPost)
router.post('/replyHistory', postController.replyHistory)

export default router