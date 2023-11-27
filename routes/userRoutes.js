// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Middleware spécifique à cette route
const authMiddleware = (req, res, next) => {
  // Mettre ici la logique d'authentification
  // Par exemple : vérification du token, etc.
  console.log('Auth middleware');
  next();
};

// Routes pour les utilisateurs
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
