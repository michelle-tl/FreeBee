var express = require('express');
var router = express.Router();

const { initialSuggestions } = require('../Suggester.js');
const { baseGraph, travelGraphOf, acoGraphOf } = require('../graph.js');

router.get('/', function(req, res) {
  res
    .status(200)
    .send('Incorrect endpoint, please use either /initiate or /iterate!');
});
router.post('/initiate', (req, res) => {
  const { from, to } = req.body;
  // console.log(req);

  if (from && to) {
    const travelGraph = travelGraphOf(baseGraph);

    const plans = initialSuggestions(from, to, travelGraph);
    res.json({
      graph: acoGraphOf(baseGraph, 0.5),
      travelGraph,
      plans
    });
  } else {
    res.json({ error: "Incorrect parameters, need 'from' and 'to'" });
  }
});

router.post('/iterate', (req, res) => {
  // const { path, acoGraph, preferences } = req.body;
  console.log(req.body);
  // res.json(req.body);
});

module.exports = router;
