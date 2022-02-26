const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getSingleUserById,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend,
} = require('../../controllers/usersController');

// /api/users 
router.route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:userId 
router.route('/:userId ')
  .get(getSingleUserById)
  .put(updateUserById)
  .delete(deleteUserById);

// /api/users/:userId /friends 
router.route('/:userId /friends')
  .post(addFriend);

// /api/users/:userId /friends/:friendId 
router.route('/:userId /friends/:friendId')
  .delete(removeFriend);

// Export module router
module.exports = router;