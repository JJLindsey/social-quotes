const router = require('express').Router();
const {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    addFriend
} = require('../../controllers/users-controllers');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);
    
// router
//     .route('/:userId/friends/:friendId')
//     .post(addFriend);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router;