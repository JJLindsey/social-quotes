const router = require('express').Router();
const {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers
} = require('../../users-controllers');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;