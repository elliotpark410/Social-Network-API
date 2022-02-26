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
    .then(({_id}) => {
        return User.findOneAndUpdate(
          { _id: req.params.userId}, 
          // $push operator is used to appends a specified value to an array
          {$push: {thoughts: _id}}, 
          {new: true});
    })
    .then(thoughtData => {
        if(!thoughtData) {
            res.status(404).json({message: 'No thought with that ID'});
            return;
        }
        res.json(thoughtData)
    })
    .catch(err => res.json(err)); 
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
      {new: true},
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
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
      {new: true},
      )
      .then((thoughtData) =>
        // if no thoughtData with matching id
        !thoughtData
          //  else then send error message
          ? res.status(404).json({ message: 'No thought with that ID' })
          //  else if, then delete reactions associated with this thought
          : Thought.deleteMany({ _id: { $in: thoughtData.reactions } })
      )
      .then(() => res.json({ message: 'Thought deleted' }))
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
      {new: true},
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
      // pulling the subdocument reaction and going into the reaction object and finding reactionId
      // If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      {new: true})
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
