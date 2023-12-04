require('dotenv').config()

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 5
});

const getAllUsers = async (req, res) => {
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
    const userId = req.params.id;
    res.json({ message: `User with ID ${userId}` });
};

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    let currentDate = new Date();
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(
            "INSERT INTO users (username, password, email, creationDate, modificationDate, creationUser, modificationUser, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [username, password, email, currentDate, currentDate, "admin", "admin", true]
        );
        //console.log(response);
        res.send("User created");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    } finally {
        if (conn) conn.release();
    }
};


const updateUser = (req, res) => {
    const userId = req.params.id;
    const { body } = req;
    res.json({ message: `User with ID ${userId} updated`, updatedUser: body });
};

const deleteUser = (req, res) => {
    const userId = req.params.id;
    res.json({ message: `User with ID ${userId} deleted` });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
