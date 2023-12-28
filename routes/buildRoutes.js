// routes/buildRoutes.js
const express = require('express');
const router = express.Router();
const buildController = require('../controllers/buildController');
const authenticateToken = require('../middleware/jwtMiddleware');

router.get('/', buildController.getAllBuilds);
router.get('/:id', buildController.getBuildById);

router.post('/:id', [authenticateToken], buildController.getBuildsFromUser); // Je sais que ça ne respecte pas parfaitement le principe CRUD, mais je ne vois pas comment faire autrement pour récupérer les builds d'un utilisateur sans passer par son ID
router.post('/', [authenticateToken], buildController.createBuild);
router.put('/:id', [authenticateToken], buildController.updateBuild);
router.delete('/:id', [authenticateToken], buildController.deleteBuild);

module.exports = router;
