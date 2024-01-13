require('dotenv').config()
const logger = require('../logger');

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
  let route = `${req.method} ${req.baseUrl}${req.path}`;
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      "SELECT * FROM builds WHERE visibility = true",
    );
    logger.info(`${route} - ${response}`);
    res.json({ response });
  } catch (error) {
    logger.error(error);
    res.status(500).send("An error occurred");
  } finally {
    if (conn) conn.release();
  }
};

const getBuildById = async (req, res) => {
  let route = `${req.method} ${req.baseUrl}${req.path}`;
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      "SELECT * FROM builds WHERE id = ? AND visibility = true", [req.params.id]
    );
    logger.info(`${route} - ${response}`);
    res.json({ response });
  } catch (error) {
    logger.error(`${route} - ${error}`);
    res.status(500).send("An error occurred");
  } finally {
    if (conn) conn.release();
  }
};

const getBuildsFromUser = async (req, res) => {
  let route = `${req.method} ${req.baseUrl}${req.path}`;
  let conn;
  const userParamId = req.params.id;
  try {
    conn = await pool.getConnection();
    const userResult = await conn.query("SELECT id FROM users WHERE email=?", [req.user.email]);
    const userId = userResult[0].id;
    let query;
    if (userId == userParamId) {
      query = "SELECT * FROM builds WHERE user = ?"
    }
    else {
      query = "SELECT * FROM builds WHERE user = ? AND visibility = true"
    }
    const response = await conn.query(
      query, [userParamId]
    );
    logger.info(`${route} - ${response}`);
    res.json({ response });
  } catch (error) {
    logger.info(`${route} - ${error}`);
    res.status(500).send("An error occurred");
  } finally {
    if (conn) conn.release();
  }
};

const createBuild = async (req, res) => {
  const { name, description, itemsArray, tagsArray, visibility } = req.body;
  let currentDate = new Date();
  let route = `${req.method} ${req.baseUrl}${req.path}`;
  let conn;
  try {
    conn = await pool.getConnection();

    const userResult = await conn.query("SELECT id FROM users WHERE email=?", [req.user.email]);
    const userId = userResult[0].id; // Assurez-vous que cette ligne corresponde à la structure de votre résultat

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

    logger.info(`${route} - ${response}`);
    res.send("Build created");
  } catch (error) {
    logger.info(`${route} - ${error}`);
    res.status(500).send("An error occurred");
  } finally {
    if (conn) conn.release();
  }
};

const updateBuild = async (req, res) => {
  let route = `${req.method} ${req.baseUrl}${req.path}`;
  const buildId = req.params.id;
  const { name, description, itemsArray, tagsArray, visibility } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    const userResult = await conn.query("SELECT id FROM users WHERE email=?", [req.user.email]);
    const userId = userResult[0].id;
    const date = new Date();
    const response = await conn.query(
      "UPDATE builds SET name = ?, description = ?, items = ?, tags = ?, visibility = ?, modificationDate = ? WHERE user = ? AND id = ? ;", 
      [name, description, itemsArray, tagsArray, visibility, date, userId, buildId]
    );
    logger.info(`${route} - ${response}`);
    res.send(`Build avec l'ID ${buildId} mis à jour`);
  } catch (error) {
    logger.info(`${route} - ${error}`);
    res.status(500).send("An error occurred");
  } finally {
    if (conn) conn.release();
  }
};

const deleteBuild = async (req, res) => {
  let route = `${req.method} ${req.baseUrl}${req.path}`;
  const buildId = req.params.id;
  let conn;
  try {
    conn = await pool.getConnection();
    const userResult = await conn.query("SELECT id FROM users WHERE email=?", [req.user.email]);
    const userId = userResult[0].id;
    const response = await conn.query(
      "DELETE FROM builds WHERE user = ? AND id = ? ;", [userId, buildId]
    );
    logger.info(`${route} - ${response}`);
    res.send(`Le build avec l'ID ${buildId} a été supprimé`);
  } catch (error) {
    logger.info(`${route} - ${error}`);
    res.status(500).send("An error occurred");
  } finally {
    if (conn) conn.release();
  }
};

module.exports = {
  getAllBuilds,
  getBuildById,
  getBuildsFromUser,
  createBuild,
  updateBuild,
  deleteBuild,
};