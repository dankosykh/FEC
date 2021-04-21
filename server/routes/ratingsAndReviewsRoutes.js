const router = require('express').Router();
const rrController = require('../controller/ratingsAndReviewsController');

// GET list of reviews with defined params_________
router.get('/', (req, res, next) => {
  rrController.getProductReviews(req.query)
    .then(response => res.send(response))
    .catch(err => res.sendStatus(404))
});

// GET meta data _________________________
router.get('/meta', (req, res, next) => {
  rrController.getMetaReviewData(req.query)
    .then(response => res.send(response))
    .catch(err => res.sendStatus(404))
});

// POST review _____________________________________
router.post('/add', (req, res, next) => {
  rrController.postReview(req.body)
    .then(response => res.send(response))
    .catch(err => res.sendStatus(404))
});

// PUT - Mark Helpful ______________________________
router.put('/helpful', (req, res, next) => {
  rrController.markHelpful(req.body)
    .then(response => res.send(console.log('success')))
    .catch(err => console.log(err))
});

// PUT - Report______________________________________
router.put('/report', (req, res, next) => {
  rrController.reportReview(req.body)
    .then(response => res.send(console.log('success')))
    .catch(err => res.sendStatus(404))
});

module.exports = router;
