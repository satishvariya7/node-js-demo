const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");
const ENDPOINTS = require("../routes/apiEndpoints");
const jwtVerification = require("../middleware/jwtVerification");

//This API use to user signup
router.post(ENDPOINTS.USER_SIGNUP, controller.userSignup);

//This API use to user login
router.post(ENDPOINTS.USER_LOGIN, controller.userLogin);

//This API use to see profile
router.get(ENDPOINTS.USER_PROFILE, jwtVerification, controller.getUserById);

//This API use to get joke
router.get(ENDPOINTS.GET_JOKE, jwtVerification, controller.getJoke);

//This API use to logout
router.get(ENDPOINTS.USER_LOGOUT, jwtVerification, controller.userLogout);

module.exports = router;
