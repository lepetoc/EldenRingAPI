const getAllUsers = (req, res) => {
    res.json({ message: 'List of users' });
};

const getUserById = (req, res) => {
    const userId = req.params.id;
    res.json({ message: `User with ID ${userId}` });
};

const createUser = (req, res) => {
    const { body } = req;
    res.json({ message: 'User created', user: body });
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
  