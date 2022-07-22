const express = require('express');
const router = express.Router({ mergeParams: true })

const skillController = require('../controllers/Skills/skill');
const check_auth = require('../middleware/check_auth');

router.get("/", check_auth, skillController.getSkills);
router.post("/", check_auth, skillController.addSkill);

module.exports = router;

