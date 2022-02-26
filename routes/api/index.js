// Require express router
const router = require('express').Router();

// require userRoutes and thoughtRoutes modules
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// define endpoint `/users` to userRoutes 
router.use('/users', userRoutes);

// define endpoint `/users` to thoughtRoutes 
router.use('/thoughts', thoughtRoutes);

module.exports = router;