const router = require('express').Router();
const {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    addFriend,
    deleteFriend

} = require('../../controllers/users-controllers');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;