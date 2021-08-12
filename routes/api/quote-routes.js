const router = require('express').Router();
const {
    getAllQuotes,
    getQuoteById,
    addQuote,
    updateQuote,
    removeQuote
} = require('../../controllers/quotes-controllers');

router
    .route('/')
    .get(getAllQuotes)
    .post(addQuote);
    
router
    .route('/:id')
    .get(getQuoteById)
    .put(updateQuote)
    .delete(removeQuote);


module.exports = router;