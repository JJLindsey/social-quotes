const { User } = require('../models');

const userController = {
    // GET all users
    getAllUsers(req, res) {
        User.find({})
            .then(dbUser => {
                console.log('hello')
                console.log(dbUser)
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    },
        // GET a single user by its _id and populated thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'quote',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    },
        // POST a new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    // PUT to update a user by its _id
    updateUser({params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, {new:true})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // DELETE to remove user by its _id
    deleteUser({params}, res) {
        User.findByIdAndDelete({_id: params.id})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    // createFriend({ body }, res) {
    //     User.create(body)
    //     .populate({
    //         path: 'friends',
    //     })
    //         .then(dbUserData => res.json(dbUserData))
    //         .catch(err => res.json(err));
    // },

    addFriend({params}, res) {
        User.findByIdAndUpdate(params.userId,
            { $push: {friends: params.friendId}},
            {new:true})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    deleteFriend({params}, res) {
        User.findByIdAndUpdate(
            params.userId,
            {$pull: {friends: params.friendId}},
            {new: true, runValidators: true}
        ).then(userData => {
            //if no pizza is found send 404 error
            if(!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
}

    // BONUS: Remove a user's associated thoughts when deleted.
module.exports = userController;