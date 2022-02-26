const { User, Thought } = require('../models');

module.exports = {
  // Get All Thoughts
  getAllThoughts(req, res) {
    Thought.find()
      // Populate will automatically replace the specified path in the document, with documents from other collections
      // populate will replace the reaction id with the reaction document
      .populate({path: 'reactions', select: '-__v'})
      .select('-__v')
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },

  // Create a New Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          //  $addToSet operator adds or appends a value to an array, only if the value does not exist in the array
          { $addToSet: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((userData) =>
        !userData
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          : res.json('Created a thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get a Single Thought By Id
  getSingleThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      // Populate will automatically replace the specified path in the document, with documents from other collections
      // populate will replace the thoughts id with the thought document
      .populate({path: 'reactions', select: '-__v'})
      .select('-__v')
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  // Update Thought By Id
  updateThoughtById(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      //  $set operator is used to replace the value of a field to the specified value
      { $set: req.body },
    )
      .then((thoughtData) =>
      !thoughtData
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thoughtData)
    )
    .catch((err) => res.status(500).json(err));
  },

  // Delete Thought By Id
  deleteThoughtById(req, res) {
    // findOneAndDelete() function is used to find a matching document, remove it, and passes the found document (if any) to the callback
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughtData) =>
        // if no thoughtData with matching id
        !thoughtData
          //  else then send error message
          ? res.status(404).json({ message: 'No thought with that ID' })
          //  else if, then delete reactions associated with this thought
          : Thought.deleteMany({ _id: { $in: thoughtData.reactions } })
      )
      .then(() => res.json({ message: 'Thought and reaction(s) deleted' }))
      .catch((err) => res.status(500).json(err));
  },

  // Add New Reaction
  addReaction(req, res) {

    console.log('You are adding a new reaction');
    console.log(req.body);

    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      //  $addToSet operator adds or appends a value to an array, only if the value does not exist in the array
      { $addToSet: { reactions: req.body } },
    )
      .populate({path: 'reactions', select: ('-__v')})
      .select('-__v')
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought found with that ID.' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },


  // Delete a Reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      // $pull operator is used to removing all instances of a value from an existing array
      { $pull: { reactions: req.params.reactionId } },
    )
      .populate({path: 'reactions', select: '-__v'})
      .select('-__v')
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought found with that ID.' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
};
