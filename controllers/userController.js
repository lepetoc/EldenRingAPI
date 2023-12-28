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
    let route = "userController/getAllUsers"
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(
            "SELECT * FROM users",
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

const getUserById = (req, res) => {
    let route = "userController/getUserById"
    const userId = req.params.id;
    res.json({ message: `User with ID ${userId}` });
};

const createUser = async (req, res) => {
    let route = "userController/createUser"
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
        //console.log(response);
        res.status(201).send({
            token: generateAccessToken(req.body.email)
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    } finally {
        if (conn) conn.release();
    }
};

const login = async (req, res) => {
    let route = "userController/login"
    const { username, email, password } = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(
            "SELECT * FROM users WHERE email=?", [email]
        );
        if (bcrypt.compareSync(req.body.password, response[0].password)){
            res.status(201).send({
                token: generateAccessToken(req.body.email)
            });
        } else {
            res.status(401).send("Wrong password");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    } finally {
        if (conn) conn.release();
    }
};

const updateUser = (req, res) => {
    let route = "userController/updateUser"
    const userId = req.params.id;
    const { body } = req;
    res.json({ message: `User with ID ${userId} updated`, updatedUser: body });
};

const deleteUser = (req, res) => {
    let route = "userController/deleteUser"
    const userId = req.params.id;
    res.json({ message: `User with ID ${userId} deleted` });
};

const generateAccessToken = (email) => {
    const payload = { email }; // Créer un objet avec l'email
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1800s' });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
};
