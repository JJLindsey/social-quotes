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
//quotes/quoteId/..
    .route('/:quoteId/reactions')
    .put(addReaction);
    // .delete(deleteReaction)

module.exports = router;


