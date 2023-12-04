require('dotenv').config()

const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 5
});

// controllers/buildController.js
const getAllBuilds = async (req, res) => {
  let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(
            "SELECT * FROM builds",
        );
        //console.log(response);
        res.json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    } finally {
        if (conn) conn.release();
    }
};

const getBuildById = (req, res) => {
  // Logique pour récupérer un build par ID
  const buildId = req.params.id;
  res.send(`Build avec l'ID ${buildId}`);
};

const getBuildsFromUser = (req, res) => {
  // Logique pour récupérer un build par ID
  const buildId = req.params.id;
  res.send(`Build de l'utilisateur ${buildId}`);
};

const createBuild = async (req, res) => {
  const { userId, name, description, itemsArray, tagsArray, visibility } = req.body;
  let currentDate = new Date();
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      "INSERT INTO builds (user, name, description, items, version, tags, visibility, creationDate, modificationDate, creationUser, modificationUser, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userId, // Remplacez par l'ID de l'utilisateur correspondant
        name, // Nom du build
        description, // Description du build
        JSON.stringify(itemsArray), // Les items sous forme de chaîne JSON
        "Version du jeu", // Version du jeu
        JSON.stringify(tagsArray), // Les tags sous forme de chaîne JSON
        visibility, // Visibilité (true pour public, false pour privé)
        currentDate, // Date de création
        currentDate, // Date de modification
        "Nom de l'utilisateur créateur", // Utilisateur qui a créé le build
        "Nom de l'utilisateur modificateur", // Utilisateur qui a modifié le build
        true // Active (true ou false)
      ]
    );

    console.log(response);
    res.send("Build created");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  } finally {
    if (conn) conn.release();
  }
};

const updateBuild = (req, res) => {
  // Logique pour mettre à jour un build par ID
  const buildId = req.params.id;
  res.send(`Build avec l'ID ${buildId} mis à jour`);
};

const deleteBuild = (req, res) => {
  // Logique pour supprimer un build par ID
  const buildId = req.params.id;
  res.send(`Build avec l'ID ${buildId} supprimé`);
};

module.exports = {
  getAllBuilds,
  getBuildById,
  getBuildsFromUser,
  createBuild,
  updateBuild,
  deleteBuild,
};
