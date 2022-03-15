const { Topic } = require('../models');

/**
 * Search for questions
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
const search = async (req, res) => {
  try {
    const aggregationResult = await Topic.aggregate([
      {
        '$match': {
            'value': 'Describe and carry out tests for'
            //            value: { $regex: "Describe and carry out tests for" }
        }
    },
    {
        '$graphLookup': {
            'from': 'topics',
            'startWith': '$_id',
            'connectFromField': '_id',
            'connectToField': 'parent_topic',
            'as': 'sub_topics',
            'maxDepth': 1
        }
    },
    {
        $unwind: "$sub_topics",
    },
    {
        $lookup: {
            from: "questions",
            localField: "sub_topic_id",
            foreignField: "annotations",
            as: "questions",
        }
    },

    {
        $project: {
            _id: 1,
            main_topic: "$value",
            sub_topic_id: "$sub_topics._id",
            parent_id: "$_id"
        }
    },

    {
        $lookup: {
            from: "questions",
            localField: "sub_topic_id",
            foreignField: "annotations",
            as: "questions",
        }
    },
    {
        $unwind: "$questions",
    },
    {
        $group: {
            _id: "$_id",
            questions: { $addToSet: "$questions.question_number" }
        }
    },
    {
        $unwind: "$questions"
    },
    {
        $sort: { _id: 1, questions: 1 }
    },
    { "$group": { "_id": "$_id", "questions": { "$push": "$questions" } } }
    ]);

    return res.status(200).json({
      code: 0,
      message: 'Success',
      data: aggregationResult[0]?.questions || [],
    });
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).json({
      code: 1,
      message: 'failed',
      description: 'Something went wrong, please try again',
    });
  }
};

module.exports = {
  search,
};
