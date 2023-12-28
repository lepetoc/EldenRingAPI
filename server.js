// index.js
const express = require('express');
const compression = require('compression');
const app = express();
require('dotenv').config()

// Middleware pour le corps des requêtes JSON
app.use(express.json());
app.use(compression());

// Routes
const userRoutes = require('./routes/userRoutes');
const buildRoutes = require('./routes/buildRoutes');

// Utilisation des routes
app.use('/users', userRoutes);
app.use('/builds', buildRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
