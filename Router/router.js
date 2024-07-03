const express=require('express')
const router=express.Router()
const userController=require('../Controllers/userController')
const jwtMiddleware = require('../Middlewares/jwt')


// signUp
router.post('/signup',userController.userSignUp)

// login
router.post('/login',userController.userLogin)

// add Product
router.post('/addproduct',jwtMiddleware,userController.addProduct)

module.exports=router