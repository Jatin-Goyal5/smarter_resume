const express = require('express');
const router = express.Router({ mergeParams: true })

const check_auth = require('../middleware/check_auth');
const userController = require('../controllers/Users/user');

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.put("/", check_auth, userController.updateUser);
router.get("/", check_auth, userController.getUser);

module.exports = router;

