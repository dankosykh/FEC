var router = require('express').Router();
var _merge = require('lodash/merge');
var productController = require('../controller/products');
var reviewController = require('../controller/reviews');

router.get('/', (req, res, next) => {
  if (!req.query.id) {
    res.sendStatus(404);
  } else {
    var item;
    var itemStyles;
    var itemRating;
    productController.getProductById(req.query.id)
      .then(result => {
        item = result;
        return reviewController.getProductRatings(req.query.id)
      })
      .then(result => {
        itemRating = result;
        return productController.getProductStyles(req.query.id)
      })
      .then(result => {
        itemStyles = result;
        var combined = _merge(item, itemStyles);
        combined.result
        combined.rating = itemRating;
        combined.photos = itemStyles.results[0].photos;
        res.send(combined);
      })
      .catch(err => res.sendStatus(500));
  };
});

module.exports = router;
