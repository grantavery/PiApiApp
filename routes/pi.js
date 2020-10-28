var axios = require('axios');
var express = require('express');
var router = express.Router();

/* GET pi. */
router.get('/', async(req, res, next) => {
  let unfetchedDigits = req.query.numberOfDigits;
  const maxDigitRequest = 1000;
  var fetchedDigits = '';
  var quotient = Math.floor(unfetchedDigits/maxDigitRequest);

  try {
    // Continue grabbing in maximum chunks until the remaining unfetched digits falls below that max
    for (i = 0; i <= quotient && unfetchedDigits > 0; i++) {
      console.log("quotient: " + quotient + " unfetched: " + unfetchedDigits + " fetched: " + fetchedDigits)
      await axios.get('https://api.pi.delivery/v1/pi', {
        params: {
          start: i * maxDigitRequest,
          numberOfDigits: quotient == i ? unfetchedDigits : maxDigitRequest
        }
      })
      .then(response => {
        fetchedDigits += response.data.content.toString();
      });

      unfetchedDigits -= maxDigitRequest;
    }

    console.log(fetchedDigits);
    res.json(fetchedDigits);
  }
  catch(error) {
    next(error)
  }
});

module.exports = router;
