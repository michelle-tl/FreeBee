const graphy = require("@dagrejs/graphlib");

const NUM_SUGGESTIONS = 3;

function dijkstraResToPath(res, from, to) {
    const path = [];
    let curr = to;
    console.log(res);
    while (curr != from) {
        let leg = { 'place': curr, 'travelMins': res[curr].distance };
        path.push(leg);
        curr = res[curr].predecessor;
    }
    let leg = { 'place': from, 'travelMins': 0 };
    path.push(leg);
    path.reverse();

    // Modify so that every edge carries its weight, not total time taken.
    let totalTime = 0;
    path.forEach(leg => {
        leg.travelMins -= totalTime;
        totalTime += leg.travelMins;
    });

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
    let edges = [];
    for (let i = 0; i < path.length - 1; i++) {
        let edge = [path[i]['place'], path[i+1]['place']];
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
    const travelGraphCopy = graphy.json.read((graphy.json.write(_travelGraph)));
    const suggestions = [];
    for (let i = 0; i < NUM_SUGGESTIONS; i++) {
        const dijkstra = graphy.alg.dijkstra(travelGraphCopy, from, (eId => travelGraphCopy.edge(eId).minutes));
        let suggestion;
        try {
            suggestion = dijkstraResToPath(dijkstra, from, to);
        } catch (err) {
            console.error("Failed to generate suggestion");
            console.error(err);
            continue;
        }
        const edges = pathToEdges(suggestion);
        edges.forEach(e => travelGraphCopy.removeEdge(e[0], e[1]));
        suggestions.push(suggestion);
    }
    return suggestions;
};


module.exports.iterateSuggestions = (chosenPath, )
