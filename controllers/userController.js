require('dotenv').config()

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 5
});

const getAllUsers = async (req, res) => {
    let route = `${req.method} ${req.baseUrl}${req.path}`;
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(
            "SELECT * FROM users",
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

const createUser = async (req, res) => {
    let route = `${req.method} ${req.baseUrl}${req.path}`;
    const { username, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    let currentDate = new Date();
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(
            "INSERT INTO users (username, password, email, creationDate, modificationDate, creationUser, modificationUser, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [username, hash, email, currentDate, currentDate, "admin", "admin", true]
        );
        logger.info(`${route} - ${response}`);
        res.status(201).send({
            token: generateAccessToken(req.body.email)
        });
    } catch (error) {
        logger.info(`${route} - ${error}`);
        res.status(500).send("An error occurred");
    } finally {
        if (conn) conn.release();
    }
};

const login = async (req, res) => {
    let route = `${req.method} ${req.baseUrl}${req.path}`;
    const { username, email, password } = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(
            "SELECT * FROM users WHERE email=?", [email]
        );
        if (bcrypt.compareSync(req.body.password, response[0].password)) {
            res.status(201).send({
                token: generateAccessToken(req.body.email)
            });
        } else {
            res.status(401).send("Wrong password");
        }
    } catch (error) {
        logger.info(`${route} - ${error}`);
        res.status(500).send("An error occurred");
    } finally {
        if (conn) conn.release();
    }
};

const updateUser = (req, res) => {
    let route = `${req.method} ${req.baseUrl}${req.path}`;
    const userId = req.params.id;
    const { body } = req;
    res.json({ message: `User with ID ${userId} updated`, updatedUser: body });
};

const deleteUser = async (req, res) => {
    let route = `${req.method} ${req.baseUrl}${req.path}`;
    let conn;
    try {
        conn = await pool.getConnection();
        const userResult = await conn.query("SELECT id FROM users WHERE email=?", [req.user.email]);
        const userId = userResult[0].id;
        const response = await conn.query(
            "DELETE FROM users WHERE id = ? ;", [userId]
        );
        logger.info(`${route} - ${response}`);
        res.send(`L'utilisateur avec l'ID ${userId} a été supprimé`);
    } catch (error) {
        logger.info(`${route} - ${error}`);
        res.status(500).send("An error occurred");
    } finally {
        if (conn) conn.release();
    }
};

const generateAccessToken = (email) => {
    const payload = { email }; // Créer un objet avec l'email
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '86400s' });
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    login,
};
