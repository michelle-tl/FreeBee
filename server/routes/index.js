var express = require('express');
var router = express.Router();


let acoGraph;
const {
  initialSuggestions,
  updateGraphs,
  getSuggestions
} = require('../Suggester.js');
const { baseGraph, travelGraphOf, acoGraphOf } = require('../graph.js');

router.get('/', function(req, res) {
  res
    .status(200)
    .send('Incorrect endpoint, please use either /initiate or /iterate!');
});
router.post('/initiate', (req, res) => {
  const { from, to, departure, arrival } = req.body;

  if (from && to) {
    const travelGraph = travelGraphOf(baseGraph);
    acoGraph = acoGraphOf(baseGraph, 0.5)
    const plans = initialSuggestions(from, to, travelGraph);
    res.json({
      // graph: acoGraph,
      plans,
      departure,
      arrival
    });
  } else {
    res.json({ error: "Incorrect parameters, need 'from' and 'to'" });
  }
});

router.post('/iterate', (req, res) => {
  const { plan, graph, departure, arrival } = req.body;

  const from = plan[0].place;
  const to = plan[plan.length - 1].place;
  // const timeMinutes = travelTimeOf(departure, arrival);
  const timeMinutes = plan.map(trip => trip.travelMins).reduce((a, b) => a + b, 0);
  const travelGraph = travelGraphOf(baseGraph);

  updateGraphs(plan, acoGraph, null);
  const suggestions = getSuggestions(
    from,
    to,
    timeMinutes,
    travelGraph,
    acoGraph,
    null
  );
  res.json({
    plans: suggestions,
    // graph,
    departure,
    arrival
  });
});


module.exports = router;
