const express = require("express");
const router = express.Router();
const controller = require("../controller/productController");
const ENDPOINTS = require("../routes/apiEndpoints");

router.get(ENDPOINTS.GET_DATA, controller.getRecords);

module.exports = router;
