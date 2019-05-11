const graphlib = require('@dagrejs/graphlib');
const Graph = graphlib.Graph;
const fs = require('fs');

const baseGraph = JSON.parse(fs.readFileSync('./TrainGraph.json'));

module.exports = {
  travelGraphOf,
  acoGraphOf,
  baseGraph
};

function acoGraphOf(baseGraph, basePheromoneLevel) {
  const acoGraph = new Graph({
    directed: false,
    compound: false,
    multigraph: false
  });

  // Set all edges with provided pheromone level
  Object.entries(baseGraph).forEach(([from, v]) => {
    v.forEach(({ to }) => acoGraph.setEdge(from, to, basePheromoneLevel));
  });

  return acoGraph;
}

function travelGraphOf(baseGraph) {
  const travelGraph = new Graph({
    directed: false,
    compound: false,
    multigraph: false
  });

  // Set all edges with travel times
  Object.entries(baseGraph).forEach(([from, v]) =>
    v.forEach(({ to, byTrip }) =>
      travelGraph.setEdge(
        from,
        to,
        travelTimeOf(byTrip.departure, byTrip.arrival)
      )
    )
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
