// index.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware pour le corps des requêtes JSON
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');

// Utilisation des routes
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
