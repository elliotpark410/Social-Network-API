const router = require('express').Router();
const {
  getAllThoughts,
  createThought,
  getSingleThoughtById,
  updateThoughtById,
  deleteThoughtById,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/')
  .get(getAllThoughts);

// /api/thoughts/:userId 
router.route('/:userId')
  .post(createThought);

// /api/thoughts/:thoughtId 
router.route('/:thoughtId')
  .get(getSingleThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

// // /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

// Export module router
module.exports = router;