// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const buildController = require('../controllers/buildController');
const authenticateToken = require('../middleware/jwtMiddleware');

// Routes pour les utilisateurs
router.get('/', userController.getAllUsers);
router.post('/login', userController.login);
router.post('/signup', userController.createUser);
router.put('/:id', [authenticateToken],userController.updateUser);
router.delete('/', [authenticateToken] ,userController.deleteUser);

router.get('/:id/builds', [authenticateToken], buildController.getBuildsFromUser); // Recupere tous les builds d'un user

module.exports = router;