const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  // define properties
  {
    username: {
      type: String, 
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String, 
      unique: true,
      required: true,
      // match email address with regular expression to validate email address
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    // populating subdocuments Thoughts
    Thought: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // populating subdocument Friends
    friends: [
      {
      type: Schema.Types.ObjectId,
      ref: 'User'
      }
    ],
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

// Create a virtual property `friendCount` that gets the user's friends array length
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
