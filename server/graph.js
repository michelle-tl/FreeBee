const graphlib = require('@dagrejs/graphlib');
const Graph = graphlib.Graph;
const fs = require('fs');

// Köpenhamn, Bryssel, Paris, Barcelona
//

const baseGraph = JSON.parse(fs.readFileSync('./TrainGraph.json'));

module.exports = {
  travelGraphOf,
  acoGraphOf,
  baseGraph,
  travelTimeOf
};

function acoGraphOf(baseGraph, basePheromoneLevel) {
  const acoGraph = new Graph({
    directed: false,
    compound: false,
    multigraph: false
  });
  Object.entries(baseGraph).forEach(([from, v]) => {
    v.forEach(({ to }) => acoGraph.setEdge(from, to, basePheromoneLevel));
  })
  return acoGraph;
}

function travelGraphOf(baseGraph) {
  const travelGraph = new Graph({
    directed: false,
    compound: false,
    multigraph: false
  });

  Object.entries(baseGraph).forEach(([from, v]) =>
  v.forEach(({ to, byTrip }) => {
    let departure, arrival;
    if (byTrip.length) {
      departure = byTrip[0].departure;
      arrival = byTrip[byTrip.length-1].arrival;
    } else {
      departure = byTrip.departure;
      arrival = byTrip.arrival;
    }
      travelGraph.setEdge(
        from,
        to,
        travelTimeOf(departure, arrival)
      );
    })
  );
  return travelGraph;
}


function travelTimeOf(departure, arrival) {
  const departureDate = new Date(departure);
  const arrivalDate = new Date(arrival);

  const timeInMillis = arrivalDate.getTime() - departureDate.getTime();
  return timeInMillis / (1000 * 60);
}

// console.log(
//   JSON.stringify(graphlib.json.write(acoGraphOf(baseGraph, 0.5), null, 2))
// );
