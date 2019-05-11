const graphy = require('@dagrejs/graphlib');

const NUM_SUGGESTIONS = 3;
// TODO: Tweak this.
const PHEROMONE_ADD_AMOUNT = 1.5;
const MAX_PHEROMONE = 1.5;
const MIN_PHEROMONE = 0.001;
const EVAPORATION_RATE = 0.9;

function dijkstraResToPath(res, from, to) {
  const path = [];
  let curr = to;
  while (curr != from) {
    let leg = { place: curr, travelMins: res[curr].distance };
    path.push(leg);
    curr = res[curr].predecessor;
  }
  let leg = { place: from, travelMins: 0 };
  path.push(leg);
  // path.reverse();

  // Modify so that every edge carries its weight, not total time taken.
  // let totalTime = 0;
  // path.forEach(leg => {
  //   leg.travelMins -= totalTime;
  //   totalTime += leg.travelMins;
  // });

  return path;
  // => { A: { distance: 0 },
  //      B: { distance: 6, predecessor: 'C' },
  //      C: { distance: 4, predecessor: 'A' },
  //      D: { distance: 2, predecessor: 'A' },
  //      E: { distance: 8, predecessor: 'F' },
  //      F: { distance: 4, predecessor: 'D' } }
}

// Takes path like above, gives edges as length-2 lists.
function pathToEdges(path) {
  const edges = [];
  for (let i = 0; i < path.length - 1; i++) {
    let edge = [path[i].place, path[i + 1].place];
    edges.push(edge);
  }
  return edges;
}

// Produce (at most) NUM_SUGGESTIONS suggested paths, all different.
// Paths have the shape:
// [
//   [ { place: 'Goteborg', travelMins: 0 },
//     { place: 'Stockholm', travelMins: 200 } ],
//   [ { place: 'Goteborg', travelMins: 0 },
//     { place: 'Jonkoping', travelMins: 70 },
//     { place: 'Stockholm', travelMins: 150 } ],
//   [ { place: 'Goteborg', travelMins: 0 },
//     { place: 'Orebro', travelMins: 1000 },
//     { place: 'Stockholm', travelMins: 10 } ]
// ]
module.exports.initialSuggestions = (from, to, _travelGraph) => {
  const travelGraphCopy = graphy.json.read(graphy.json.write(_travelGraph));
  const suggestions = [];
  for (let i = 0; i < NUM_SUGGESTIONS; i++) {
    const dijkstra = graphy.alg.dijkstra(
      travelGraphCopy,
      from,
      eId => travelGraphCopy.edge(eId),
      nId => travelGraphCopy.nodeEdges(nId)
    );
    // console.log(dijkstra);

    let suggestion;
    try {
      suggestion = dijkstraResToPath(dijkstra, from, to);
    } catch (err) {
      console.error('Failed to generate suggestion');
      console.error(err);
      continue;
    }
    const edges = pathToEdges(suggestion);

    edges.forEach(e => travelGraphCopy.removeEdge(e[0], e[1]));
    suggestions.push(suggestion);
  }
  return suggestions;
};

// Strengthen good connections, produce new suggestions.
// Will modify acoGraph and preferencesMap.
module.exports.getSuggestions = (
  from,
  to,
  timeMinutes,
  travelGraph,
  acoGraph,
  preferencesMap
) => {
  let suggestions = [];
  
  for (let i = 0; i < NUM_SUGGESTIONS; i++) {
    
    let path = [{ place: from, travelMinutes: 0 }];
    let curr = from;
    let taboo = { from: true };
    let remainingTime = timeMinutes;
    while (curr != to) {
      let edges = acoGraph.nodeEdges(curr).filter(e => !taboo[e.w]);
      let pheromones = edges.map(e => ({
        ph: acoGraph.edge(e),
        e: e
      }));
      pheromones.sort((o1, o2) => o1.ph - o2.ph);
      let totalPheromones = pheromones
        .map(e => e.ph)
        .reduce((a, b) => a + b, 0);
      let probAcc = 0;
      let rand = Math.random();
      let j = 0;
      while (rand >= probAcc) {
        probAcc += pheromones[j].ph / totalPheromones;
        j++;
      }
      let newPlace = pheromones[j - 1].e.w;
      let travelMins = travelGraph.edge(curr, newPlace);
      remainingTime -= travelMins;
      // if (remainingTime < 0) break;
      taboo['newPlace'] = true;
      curr = newPlace;
      path.push({ place: curr, travelMins: travelMins });
    }
    if (curr != to) {
      // Means we ran out of time, redo the loop, find a new connection.
      // i--;
    } else {
      console.log("Stop");
      
      // Add stays.
      // TODO: Use preference map.
      let slices = [];
      for (let j = 0; j < path.length - 2; j++) {
        slices.push(Math.random() * remainingTime);
      }
      slices.sort();
      let stayTimes = [0]; // For first place.
      let timeAcc = 0;
      for (let j = 0; j < path.length - 1; j++) {
        let stayTime = slices[j] - timeAcc;
        stayTimes.push(stayTime);
        timeAcc += stayTime;
      }
      for (let j = 0; j < path.length; j++) {
        path[i]['stayMins'] = stayTimes[j];
      }
      suggestions.push(path);
    }
  }
  return suggestions;
};

module.exports.updateGraphs = (chosenPath, acoGraph, preferencesMap) => {
  // Evaporate.
  let edges = acoGraph.edges();
  edges.forEach(({ v, w }) => {
    let currentPheromone = acoGraph.edge(v, w);
    let newPheromone = (1 - EVAPORATION_RATE) * currentPheromone;
    acoGraph.setEdge(v, w, newPheromone);
  });

  // Discharge pheromones.
  for (let i = 0; i < chosenPath.length - 1; i++) {
    let from = chosenPath[i].place;
    let to = chosenPath[i + 1].place;
    let currentPheromone = acoGraph.edge(from, to);
    let newPheromone = currentPheromone + PHEROMONE_ADD_AMOUNT;
    newPheromone = newPheromone > MAX_PHEROMONE ? MAX_PHEROMONE : newPheromone;
    newPheromone = newPheromone < MIN_PHEROMONE ? MIN_PHEROMONE : newPheromone;
    acoGraph.setEdge(from, to, newPheromone);
  }

  // TODO: Update preferenceMap.
};
