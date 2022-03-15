const router = require('express').Router();
const { databaseCtrl, questionCtrl } = require('./controllers');
/**
 * Responds to base URL
 */
router.get('/', (req, res) =>
  res.status(200).json({
    code: "00",
    msg: "App is running. Send a post request to '/search'",
  })
);

/**
 * Seed data into the database
 * @returns
 */
router.get('/seed-db', async (req, res) => {
  return res.json(await databaseCtrl.seed());
});

/**
 * Handles search route
 */
router.get('/search', questionCtrl.search);

/**
 * Handles Unwanted URLs as 404
 */
router.use('*', (req, res, next) =>
  res.status(404).json({
    code: "04",
    message: 'failed',
    description: 'No such url found on this server',
  })
);

module.exports = router;
