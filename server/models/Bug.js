const { Schema, model } = require('mongoose');

const bugSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    // created date
    assignedUser: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    ],
    project: 
      {
        type: Schema.Types.ObjectId,
        ref: 'Project'
      },
  }
);

const Bug = model('Bug', bugSchema);

module.exports = Bug;
