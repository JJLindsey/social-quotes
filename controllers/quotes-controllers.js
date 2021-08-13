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
    addQuote({ params, body }, res) {
        console.log(body);
        Quote.create(body)
            .then(({ _id }) => {
                return Quote.findOneAndUpdate(
                    { _id: params.quoteId },
                    { $push: { 'Quotes': _id } },
                    { new: true }
                );
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
    },
//   POST to create a reaction stored in a single thought's reactions array field
    addReaction({ params}, res) {
        Quote.create(
            { _id: params.quoteId },
            {$push: {
                reactions: params.reactionId
            }
        }, {new:true})
        .then(dbQuoteData => res.json(dbQuoteData))
            .catch(err => res.json(err));
    },
// DELETE to pull and remove a reaction by the reaction's reactionId value
    removeReaction({ params }, res) {
        Quote.findOneAndDelete(
            {_id: params.reactionId },
            {$pull: { reactions: { reactionId: params.reactionId } } }
        )
        .then(dbQuoteData => res.json(dbQuoteData))
        .catch(err => res.json(err));
    }
};

module.exports = quoteController;