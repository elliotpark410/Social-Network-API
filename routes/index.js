// Require express router
const router = require('express').Router();

// Import all of the API routes 
const apiRoutes = require('./api');

// tell express router to use /api for all apiRoutes so developer only has to prepend /api once
router.use('/api', apiRoutes);

// if incorrect route, send message 'wrong route!'
router.use((req, res) => res.send('Wrong route!'));

// Module exports router
module.exports = router;
