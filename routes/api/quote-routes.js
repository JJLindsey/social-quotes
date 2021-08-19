const router = require('express').Router();
const {
    getAllQuotes,
    getQuoteById,
    addQuote,
    updateQuote,
    removeQuote,
    addReaction
} = require('../../controllers/quotes-controllers');

router
    .route('/')
    .get(getAllQuotes)

// /quotes/:userId
router
    .route('/:userId')
    .post(addQuote);

router
    .route('/:id')
    .get(getQuoteById)
    .put(updateQuote)
    .delete(removeQuote);

router
//thoughts/quoteId/..
    .route('/:quoteId/reactions')
    .put(addReaction);
    // .delete(deleteReaction)

module.exports = router;


// // /api/thoughts/:thoughtId/users/:userId
// router.route('/:thoughtId/users/:userId')
// .delete(deleteThought)

