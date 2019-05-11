var express = require('express');
var router = express.Router();

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

    const plans = initialSuggestions(from, to, travelGraph);
    res.json({
      graph: acoGraphOf(baseGraph, 0.5),
      // travelGraph,
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
  const timeMinutes = travelTimeOf(departure, arrival);
  const travelGraph = travelGraphOf(baseGraph);

  updateGraphs(plan, graph, null);
  const suggestions = getSuggestions(
    from,
    to,
    timeMinutes,
    travelGraph,
    graph,
    null
  );
  res.json({
    plans: suggestions,
    graph,
    departure,
    arrival
  });
});

module.exports = router;
