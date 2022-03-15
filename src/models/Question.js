const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema(
  {
    question_number: {
      type: Number,
    },
    annotations: {
      type: [mongoose.Schema.ObjectId],
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

module.exports = mongoose.model('Question', questionsSchema);
