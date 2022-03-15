const mongoose = require('mongoose');

const topicsSchema = new mongoose.Schema(
  {
    value: {
      type: String,
    },
    parent_topic: {
      type: mongoose.Schema.ObjectId,
      required: [false],
      ref: 'Topic',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);


module.exports = mongoose.model('Topic', topicsSchema);
