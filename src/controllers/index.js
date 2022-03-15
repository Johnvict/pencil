const { search } = require('./questionController');
const { seed } = require('./databaseController');

module.exports = {
  questionCtrl: { search },
  databaseCtrl: { seed },
};
