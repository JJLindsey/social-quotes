const { User } = require('../models');
const { findOneAndUpdate } = require('../models/User');

const userController = {
    // GET all users
    getAllUsers(req, res) {
        User.find({})
            .then(dbUser => {
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
        User,findOneAndUpdate({ _id: params.id}, body, {new:true})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No pizza User with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // DELETE to remove user by its _id
    deleteUser({params}, res) {
        User.findByIdAndDelete({_id: param.id})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
}

    // BONUS: Remove a user's associated thoughts when deleted.
module.exports = userController;