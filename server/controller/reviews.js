const axios = require('axios');
const auth_token = require('../../authorization.config.js').token;
const calc = require('./calculator.js');

/* --------------------------------api options -------------------------------*/

var options = {
  headers: {
    'Authorization': auth_token
  }
}
var url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews';


/* ---------------------------------controller module ------------------------*/

var reviewController = {
  getProductReviews: (id, page, count, sort) => {
    return new Promise((resolve, reject) => {
      axios.get(url, options)
        .then(result => {
          resolve(result.data);
        })
        .catch(err => reject(err));
      });
  },

  getProductRatings: (id) => {
    return new Promise((resolve, reject) => {
      axios.get(url + `/meta/?product_id=${id}`, options)
        .then(result => {
          let numOfRatings = calc.numOfReviews(result);
          let averageScore = calc.averageRatingToQtr(result.data.ratings)
          resolve(averageScore);
        })
        .catch(err => reject(err));
      });
  }
}

module.exports = reviewController;
