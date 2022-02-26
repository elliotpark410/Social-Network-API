const { User, Thought } = require('../models');

module.exports = {
  // Get All Users
  getAllUsers(req, res) {
    User.find()
      // Populate will automatically replace the specified path in the document, with documents from other collections
      // populate will replace the thoughts id with the thought document
      .populate({path: 'thoughts', select: '-__v'})
      // populate will replace the friends id with the friend document
      .populate({path: 'friends', select: '-__v'})
      .select('-__v')
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // Create a New User
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // Get a Single User By Id
  getSingleUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      // Populate will automatically replace the specified path in the document, with documents from other collections
      // populate will replace the thoughts id with the thought document
      .populate({path: 'thoughts', select: '-__v'})
      // populate will replace the friends id with the friend document
      .populate({path: 'friends', select: '-__v'})
      .select('-__v')
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  // Update User By Id
  updateUserById(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      //  $set operator is used to replace the value of a field to the specified value
      { $set: req.body },
      {new: true},
    )
      .then((userData) =>
      !userData
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(userData)
    )
    .catch((err) => res.status(500).json(err));
  },

  // Delete User By Id
  deleteUserById(req, res) {
    // findOneAndRemove() function is used to find the element according to the condition and then remove the first matched element
    User.findOneAndRemove(
      { _id: req.params.userId },
      {new: true},
      )
      .then((userData) =>
        // if no userData with matching id
        !userData
          //  else then send error message
          ? res.status(404).json({ message: 'No user with that ID' })
          //  else if, then delete thoughts associated with this user
          : Thought.deleteMany({ _id: { $in: userData.thoughts } })
      )
      .then(() => res.json({ message: 'User succesfully deleted' }))
      .catch((err) => res.status(500).json(err));
  },

  // Add New Friend
  addFriend(req, res) {

    console.log('You are adding a new friend');
    console.log(req.body);

    User.findOneAndUpdate(
      { _id: req.params.userId },
      
      //  $addToSet operator adds or appends a value to an array, only if the value does not exist in the array
      { $addToSet: { friends: req.body } },
      {new: true},
    )
      .populate({path: 'friends', select: ('-__v')})
      .select('-__v')
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: 'No user found with that ID.' })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },


  // Remove a Friend
  removeFriend(req, res) {

    console.log('You are removing a friend');

    User.findOneAndUpdate(
      { _id: req.params.userId },
      // $pull operator is used to removing all instances of a value from an existing array
      // pulling the subdocument friends and choosing by friendId
      // If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
      { $pull: { friends: req.params.friendId } },
      { new: true },
      )
      .populate({path: 'friends', select: '-__v'})
      .select('-__v')
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: 'No user found with that ID.' })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
};
