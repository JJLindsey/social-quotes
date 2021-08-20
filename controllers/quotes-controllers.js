const { Quote, User } = require('../models');

const quoteController = {
    // GET to get all thoughts
    getAllQuotes(req, res) {
        Quote.find()
            .then(quoteData => {
                res.json(quoteData);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            });
    },
    // GET to get a single thought by its _id
    getQuoteById({ params }, res) {
        Quote.findOne({ _id: params.id })
            .then(dbQuote => {
                res.json(dbQuote);
            })
            .catch(err => {
                res.json(err);
            });
    },
    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    addQuote({ params, body }, res) {
        // console.log(body);
        Quote.create(body)
            .then(({_id}) => {
                return User.findByIdAndUpdate(
                    params.userId,
                    {$push: {quotes: _id}},
                    {new: true, runValidators:true}
                    )
                })
                .then(quoteData => {
                    if(!quoteData) {
                        res.status(404).json({ message: 'No User found with this id!' });
                        return;
                    }
                    res.json(quoteData);
                // console.log(newQuote)
                // res.json({newQuote})
                // return Quote.findOneAndUpdate(
                //     { _id: params.quoteId },
                //     { $push: { 'Quotes': _id } },
                //     { new: true }
                // );
                })
                .catch(err => res.json(err));
    },

    // PUT to update a thought by its _id
    updateQuote({ params, body }, res) {
        Quote.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbQuote => {
                res.json(dbQuote);
            })
            .catch(err => {
                res.json(err);
            });
    },
    // DELETE to remove a thought by its _id
    removeQuote({ params }, res) {
        Quote.findByIdAndDelete(params.id)
            .then(dbQuote => {
                if (!dbQuote) {
                    res.status(404).json({
                        message: 'No Thought id found!'
                    })
                    return;
                }
                return User.findByIdAndUpdate(
                    params.userId, {
                        $pull: {
                            quotes: params.quoteId
                        }
                    }, {
                        new: true
                    }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No user found with this ID'
                    })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },
    //ADD reaction
    addReaction({params, body}, res) {
        Quote.findByIdAndUpdate(
            params.quoteId,
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then(quoteData => {
            if(!quoteData) {
                res.status(404).json({ message: 'No quote with this id!' });
                return;
            }

            res.json(quoteData);
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        });
    },
}

module.exports = quoteController;