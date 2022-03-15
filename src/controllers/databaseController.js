/**
 * @typedef {Question}
 * @property {Object} n
 *
 * @typedef {Topic}
 * @property {Object} n
 *
 * @typedef {Object} QuestionAndTopicData
 * @property {Question[]} questions - Array of question objects
 * @property {Topic[]} topics - Array of topic objects
 */

const reader = require('xlsx');
const { Question, Topic } = require('../models');

const seed = async () => {
  const data = await loadDatabaseFile();

  const topics = await seedTopics(data.topics);
  const questions = await seedQuestions(data.questions, topics);

  return { topics, questions };
};

/**
 * Loads database data from excel file
 *
 * @returns {Promise<QuestionAndTopicData>} data - Data fetched from file
 */
const loadDatabaseFile = async () => {
  console.log(__dirname);
  const file = reader.readFile(
    `${__dirname}/../database/data/questions_and_topics.xlsx`
  );
  const data = {
    questions: [],
    topics: [],
  };

  const temp = await reader.utils.sheet_to_json(file.Sheets['Questions']);
  temp.forEach((res) => {
    data.questions.push(res);
  });
  const temp2 = await reader.utils.sheet_to_json(file.Sheets['Topics']);
  temp2.forEach((res) => {
    data.topics.push(res);
  });

  return data;
};

/**
 * Seeds topics into topics collection if not already seeded
 * @param {Promise<Topic[]>} topics - Topic array
 */
const seedTopics = async (topics) => {
  const storedData = await Topic.find();
  if (storedData?.length < 1) {
    const topicsToStore = [];
    let lastId = null;
    topics.forEach((item) => {
      for (let itemIndex in item) {
        lastId = itemIndex == 'Topic Level 1' ? null : lastId;
        lastId = formatIntoTopicTree(topicsToStore, item[itemIndex], lastId);
      }
    });
    Topic.insertMany(topicsToStore);

    return topicsToStore;
  }
  return storedData;
};

/**
 * Seeds topics into questions collection if not already seeded
 * @param {Promise<Question[]>} questions - Questions array
 */
const seedQuestions = async (questions, topics) => {
  const storedData = await Question.find();
  if (storedData?.length < 1) {
    const questionsToStore = questions.map((item) => {
      const data = Object.values(item);
      const question_number = data.shift();
      const annotations = data.map((annotation) => {
        const id = fetchTopicId(topics, annotation);
        if (!id) {
          console.log({ notFound: annotation });
        }
        return id;
      });
      return new Question({
        question_number,
        annotations,
      });
    });

    Question.insertMany(questionsToStore);
    return questionsToStore;
  }
  return storedData;
};

/**
 * Formats topics into an array that ensure uniqueness of every topic
 * and also returns the parent topic id
 *
 * @param {Object[]} parentObject Accumulator array that maintains no repetition of items
 * @param {string} stringToCheck Topic string
 * @param {string} parentId Object Id of the parent topic
 * @returns {string} objectId of the parent topic
 */
const formatIntoTopicTree = (parentObject, stringToCheck, parentId = null) => {
  const object = parentObject.find((item) => item.value == stringToCheck);

  if (object) {
    return object.id;
  } else {
    const createdObject = new Topic({
      parent_topic: parentId == null ? null : parentId,
      value: stringToCheck,
    });
    parentObject.push(createdObject);
    return createdObject.id;
  }
};

/**
 * Fetches annotation id from list of topics
 *
 * @param {Object[]} parentObject Accumulator array that maintains no repetition of items
 * @param {string} stringToCheck Topic string
 * @returns {string} objectId of the parent topic
 */
const fetchTopicId = (parentObject, stringToCheck) => {
  const object = parentObject.find((item) => item.value == stringToCheck);
  return object?.id;
};

module.exports = {
  seed,
};
