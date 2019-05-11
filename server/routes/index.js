var express = require('express');
var router = express.Router();

const { initialSuggestions } = require('../Suggester.js');
const { graph } = require('../ExampleGraph.js');
// const graph = require('../graph.js');

router.get('/', function(req, res) {
  res
    .status(200)
    .send('Incorrect endpoint, please use either /initiate or /iterate!');
});
router.post('/initiate', (req, res) => {
  const { from, to } = req.body;
  console.log(req);

  if (from && to) {
    res.json({
      graph: {},
      plans: [
        {
          place: 'Stockholm',
          travelMinutes: '120',
          stayMinutes: '60'
        },
        {
          place: 'Halsberg',
          travelMinutes: '100',
          stayMinutes: '30'
        },
        {
          place: 'Gothenburg',
          travelMinutes: '150',
          stayMinutes: '40'
        }
      ]
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
