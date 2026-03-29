const { Router } = require('express')
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = Router()

// REGISTER
authRouter.post("/register", authController.registerUserController)

// LOGIN
authRouter.post("/login", authController.loginUserController)

// LOGOUT (fixed)
authRouter.post(
    "/logout",
    authMiddleware.authUser,
    authController.logoutUserController
)

// GET CURRENT USER (renamed)
authRouter.get(
    "/me",
    authMiddleware.authUser,
    authController.getMeController
)

module.exports = authRouter