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
    //.post(addQuote);

// /quotes/:userId
router
    .route('/:userId')
    .post(addQuote);

router
    .route('/:id')
    .get(getQuoteById)
    .put(updateQuote)
    .delete(removeQuote);


module.exports = router;

// /api/thoughts/:id
// router.route('/:id')
// .get(getSingleThought)
// .put(updateThought)



// // /api/thoughts/:thoughtId/users/:userId
// router.route('/:thoughtId/users/:userId')
// .delete(deleteThought)

// // /api/thoughts/:thoughtId/reactions
// router.route('/:thoughtId/reactions')
// .put(addReaction)
// .delete(deleteReaction)