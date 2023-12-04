const mariadb = require('mariadb');
const pool = mariadb.createPool({ host: "localhost", user: "admin", password: "admin", database: "eldenring", connectionLimit: 5 });

const getAllUsers = (req, res) => {
    res.json({ message: 'List of users' });
};

const getUserById = (req, res) => {
    const userId = req.params.id;
    res.json({ message: `User with ID ${userId}` });
};

const createUser = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(
            "INSERT INTO users (username, password, email, creationDate, modificationDate, creationUser, modificationUser, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            ["username123", "p@ssw0rd", "user123@example.com", new Date(), new Date(), "admin", "admin", true]
        );
        console.log(response);
        res.send("User created");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    } finally {
        if (conn) conn.release(); //release to pool
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
