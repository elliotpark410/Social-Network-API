const { Schema, model } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

// require schema in Reaction.js
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
  // define properties
  {
    thoughtText: {
      type: String, 
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date, 
      default: Date.now(),
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    // populating subdocuments username
    username: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    // populating subdocument Friends
    reactions: [reactionSchema],
  },
  {
    // Mongoose supports transforming Objects after querying MongoDb: toJSON 
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the thought's reactions array length
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our User model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
