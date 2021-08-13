const router = require('express').Router();
const {
    getAllQuotes,
    getQuoteById,
    addQuote,
    updateQuote,
    removeQuote,
    addReaction,
    removeReaction
} = require('../../controllers/quotes-controllers');

router
    .route('/')
    .get(getAllQuotes)
    .post(addQuote);
    
router
    .route('/:id')
    .get(getQuoteById)
    .put(updateQuote)
    .delete(removeQuote)
    .post(addReaction)
    .delete(removeReaction)


module.exports = router;