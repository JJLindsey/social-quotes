const { Quote, User } = require('../models');

const quoteController = {
    // GET to get all thoughts
    getAllQuotes(req, res) {
        Quote.find({})
            .then(dbQuote => {
                res.json(dbQuote);
            })
            .catch(err => {
                res.json(err);
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
    addQuote({ body }, res) {
        console.log(body);
        Quote.create(body)
            .then(dbQuote => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { quotes: dbQuote._id } },
                    { new: true }
                ).then(dbUserQuote => {
                    res.json(dbUserQuote);
                })
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
        Quote.findOneAndUpdate(
            { _id: params.quoteId },
            { $pull: { quote: { quoteId: params.quoteId } } },
            { new: true }
        )
            .then(dbQuoteData => res.json(dbQuoteData))
            .catch(err => res.json(err));
    }
};

module.exports = quoteController;