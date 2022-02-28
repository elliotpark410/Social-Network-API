const { Schema, Types } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

// Schema to create reaction model
const reactionSchema = new Schema(
  // define properties
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: 
      {
        type: Date,
        default: Date.now(),
        get: (date) => dateFormat(date),
      },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;