const router = require('express').Router();
const userRoutes = require('./users-routes');
const quoteRoutes = require('./quote-routes');

router.use('/users', userRoutes);
router.use('/quotes', quoteRoutes);

module.exports = router;
