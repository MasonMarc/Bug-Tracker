const { Schema, model } = require('mongoose');

const bugSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      trim: true
    },
  }
);

const Bug = model('Bug', bugSchema);

module.exports = Bug;
