// routes/buildRoutes.js
const express = require('express');
const router = express.Router();
const buildController = require('../controllers/buildController');
const authenticateToken = require('../middleware/jwtMiddleware');

router.get('/', buildController.getAllBuilds);
router.get('/:id', buildController.getBuildById);

router.post('/', [authenticateToken], buildController.createBuild);
router.put('/:id', [authenticateToken], buildController.updateBuild);
router.delete('/:id', [authenticateToken], buildController.deleteBuild);

module.exports = router;



// create table prout ( name uuid not null primary key);


// 
// GET /build/ => recupere tous les builds
// GET /build/:id => recupere un build unique
// POST /build => creation nouveau build

// GET /users/:id/builds/ => recuperent tous les builds d'un user
// POST /users/:id/builds/ => creer un build pour un utilisateur defini

// /users/1/build => [{"name": "pouet1"}, {"name": "pouet2"}]
// /users/b79fb731-97fc-481a-981a-33e0e71f7b4a/build => [{"name": "pouet1"}, {"name": "pouet2"}]