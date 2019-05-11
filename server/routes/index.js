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

const travelGraph = travelGraphOf(baseGraph);
router.post('/iterate', (req, res) => {
  const { plan, graph, departure, arrival } = req.body;

  const from = plan[0].place;
  const to = plan[plan.length - 1].place;
  // const timeMinutes = travelTimeOf(departure, arrival);
  const timeMinutes = 100000;//plan.map(trip => trip.travelMins).reduce((a, b) => a + b, 0);

  updateGraphs(plan, acoGraph, null);

  // const suggestions = getSuggestions(
  //   from,
  //   to,
  //   timeMinutes,
  //   travelGraph,
  //   acoGraph,
  //   null
  //   );
    console.log("Hello");
    const getResponse = [[{"place":"BARCELONA CITY (Spain)","travelMins":646},{"place":"MARSEILLE ST CHARLES (France)","travelMins":338},{"place":"PARIS (France)","travelMins":139},{"place":"LONDON (United Kingdom)","travelMins":0}],[{"place":"BARCELONA CITY (Spain)","travelMins":646},{"place":"PARIS (France)","travelMins":139},{"place":"LONDON (United Kingdom)","travelMins":0}],[{"place":"BARCELONA CITY (Spain)","travelMins":646},{"place":"MARSEILLE ST CHARLES (France)","travelMins":338},{"place":"PARIS (France)","travelMins":139},{"place":"STRAUSBURG (France)","travelMins":0},{"place":"ROTTERDAM (Netherlands)","travelMins":0},{"place":"LONDON (United Kingdom)","travelMins":0}]];
    
    // [{"place":"BARCELONA CITY (Spain)","travelMins":1332},{"place":"MADRID CITY (Spain)","travelMins":1161},{"place":"MARSEILLE ST CHARLES (France)","travelMins":686},{"place":"AMSTERDAM (Netherlands)","travelMins":266},{"place":"LONDON (United Kingdom)","travelMins":0}],[{"place":"BARCELONA CITY (Spain)","travelMins":2366},{"place":"SEVILLA CITY (Spain)","travelMins":1826},{"place":"MADRID CITY (Spain)","travelMins":1676},{"place":"ZARAGOZA CITY (Spain)","travelMins":1589},{"place":"NICE (France)","travelMins":1200},{"place":"STRASBOURG (France)","travelMins":841},{"place":"PARIS (France)","travelMins":735},{"place":"DUISBURG HBF (Germany)","travelMins":467},{"place":"ESSEN HBF (Germany)","travelMins":455},{"place":"DORTMUND HBF (Germany)","travelMins":433},{"place":"LONDON (United Kingdom)","travelMins":0}]]
  res.json({
    plans: getResponse,
    // graph,
    departure,
    arrival
  });
});


module.exports = router;
