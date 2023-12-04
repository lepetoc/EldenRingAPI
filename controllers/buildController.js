const mariadb = require('mariadb');
const pool = mariadb.createPool({ host: "localhost", user: "admin", password: "admin", database: "eldenring", connectionLimit: 5 });

// controllers/buildController.js
const getAllBuilds = (req, res) => {
  // Logique pour récupérer tous les builds
  res.send('Liste de tous les builds');
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

const createBuild = (req, res) => async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    res.send('Build créé');
    console.log(res);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
  // Logique pour créer un build
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
