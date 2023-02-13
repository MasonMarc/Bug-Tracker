const { Schema, model } = require('mongoose');

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    bugs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Bug'
      }
    ]
  }
);

const Project = model('Project', projectSchema);

module.exports = Project;
