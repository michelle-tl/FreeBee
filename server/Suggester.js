const graphy = require("@dagrejs/graphlib");

const NUM_SUGGESTIONS = 3;

function dijkstraResToPath(res, from, to) {
    const path = [];
    let curr = to;
    while (curr != from) {
        let leg = { 'place': curr, 'travelMins': res[curr].distance };
        path.push(leg);
        curr = res[curr].predecessor;
    }
    return path.reverse();
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

module.exports.initialSuggestions = (from, to, _travelGraph) => {
    const travelGraphCopy = graphy.json.read((graphy.json.write(_travelGraph)));
    const suggestions = [];
    for (let i = 0; i < NUM_SUGGESTIONS; i++) {
        const dijkstra = graphy.alg.dijkstra(travelGraph, from, (eId => travelGraph.edge(e).minutes));
        const suggestion = dijkstraResToPath(dijkstra, from, to);
        const edges = pathToEdges(suggestion);
        edges.forEach(e => travelGraphCopy.removeEdge(e[0], e[1]));
        suggestions.push(suggestion);
    }
    return suggestions;
};
