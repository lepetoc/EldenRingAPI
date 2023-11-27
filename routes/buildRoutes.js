// routes/buildRoutes.js
const express = require('express');
const router = express.Router();
const buildController = require('../controllers/buildController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', buildController.getAllBuilds);
router.get('/:id', buildController.getBuildById);
router.post('/', buildController.createBuild);
router.put('/:id', buildController.updateBuild);
router.delete('/:id', buildController.deleteBuild);

module.exports = router;
