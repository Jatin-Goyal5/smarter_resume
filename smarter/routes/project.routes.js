const express = require('express');
const router = express.Router({ mergeParams: true })

const projectController = require('../controllers/Projects/project');
const check_auth = require('../middleware/check_auth');

router.get("/", check_auth, projectController.getProjects);
router.post("/", check_auth, projectController.addProject);

module.exports = router;

