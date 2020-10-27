var axios = require('axios');
var express = require('express');
var router = express.Router();

/* GET pi. */
router.get('/', async(req, res, next) => {
  axios.get("https://api.pi.delivery/v1/pi", {
    params: {
      start: req.query.start,
      numberOfDigits: req.query.numberOfDigits
    }
  })
    .then(response => res.json(response.data))
    .catch(err => next(err));
});

module.exports = router;
