const express = require('express')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')


const router = new express.Router()

router.post('/register',userController.registerController)
router.post('/login',userController.loginController)
router.get('/all-users',jwtMiddleware,userController.allUserController)
router.get('/single-user',jwtMiddleware,userController.userDetailViewController)

module.exports = router
