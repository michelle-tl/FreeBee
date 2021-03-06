const GRAPH_FILE_NAME = "TrainGraph.json";
const SUCCESS_FILE_NAME = "PairSuccesses.json";
const RETRY_RESULTLESS = false;

const fs        = require('fs');
const interrail = require('interrail');
const async     = require('async');
const Graph     = require('@dagrejs/graphlib').Graph;


const stationsDict = JSON.parse(fs.readFileSync("Stations.json"));
const stations = Object.values(stationsDict);

// For reproducability, always use this departure time when constructing the
// graph.
const DEPARTURE_DATE = new Date("2019-06-10T10:30:00+02:00");

// CACHE RELOAD.

// Load the existing graph: We want to extend it!
const graph = JSON.parse(fs.readFileSync(GRAPH_FILE_NAME));

// If necessary, add new stations to the graph.
const stationIds = Object.values(stationsDict).map(c => c.station.id);
// Initially empty lists.

console.log("GRAPH: ");
console.log(graph);

// Record successful queries, so we don't need to redo them.
var successes = {};

const DONE = "done";
const NO_RES = "no result";
const FAILED = "query failed";

try {
    successes = JSON.parse(fs.readFileSync(SUCCESS_FILE_NAME));
} catch (err) {
    console.log("Rebuilding success file");
    successes = {};
    let graphKeys = Object.keys(graph);
    for (let i = 0; i < graphKeys.length; i++) {
        // Put all existing edges in successes file.
        graph[graphKeys[i]].map(edge => {
            let trip = edge.byTrip;
            // TODO: Fix, this is broken now.
            let other = trip.origin.name == graphKeys[i] ? trip.destination.name : graphKeys[i];
            successes[[graphKeys[i], other]] = DONE;
            successes[[other, graphKeys[i]]] = DONE;
        });
    }
}


// QUERIES.

// Malmo to Lund, example:
// interrail.journeys("7402485", "7402611", {results: 1, transfers: 0, when: DEPARTURE_DATE}).then(console.log)
// Goteborg: 7401318
// Stockholm: 9900009

const queries = [];
const journeyOptions = {results: 1, transfers: 1, when: DEPARTURE_DATE};
for (let i = 0; i < stations.length; i++) {
    let from   = stations[i].station.name;
    let fromId = stations[i].station.id;
    for (let j = i+1; j < stations.length; j++) {
        let to   = stations[j].station.name;
        let toId = stations[j].station.id;

        // Skip already successful queries.
        if (successes[[from, to]] == DONE) continue;
        // Skip, but maybe extend later (with more dates, for example).
        if (!RETRY_RESULTLESS && successes[[from, to]] == NO_RES) continue;
        // We allow previously failed queries to go through.

        queries.push(callback =>
        interrail.journeys(fromId, toId, journeyOptions)
            .then(res => {
                if (res.length > 0) {
                    // Never repeat this query.
                    successes[[from, to]] = DONE;
                    console.log("Got response from interrail: ");
                    console.log(from + " --> " + to);
                    callback(null, {'from': from, 'to': to, 'res': res[0]});
                }
                else {
                    successes[[from, to]] = NO_RES;
                    callback(null, null);
                }
            })
            .catch(err => {
                if (successes[[from,to]]) {
                    let prev = successes[[from,to]];
                    let count = prev[1];
                    successes[[from, to]] = [FAILED, count + 1];
                } else {
                    successes[[from, to]] = [FAILED, 1];
                }
                console.error("ERR" + err);
                callback(null, null);
            }));
    }
}

// SAVE RESULTS.

async.parallel(queries, (err, res) => {
    console.log("All search results: ");
    console.log(res);
    // Get rid of searches that gave no result.
    res = res.filter(s => s !== null);

    for (let i = 0; i < res.length; i++) {
        let from = res[i].from;
        let to   = res[i].to;
        let trip = res[i].res.legs; // We guarantee to only ever have one leg.
        // Make the graph undirected: Same info in each edge.
        let node1 = graph[from];
        graph[from] = node1 ? node1 : [];
        graph[from].push({'to': to, 'byTrip': trip});

        let node2 = graph[to];
        graph[to] = node2 ? node2 : [];
        graph[to].push({'to': from, 'byTrip': trip});
    }
    fs.writeFile(GRAPH_FILE_NAME, JSON.stringify(graph), err =>
                 { if (err) console.error(err);
                   else console.log("Saved graph file");
                 });
    fs.writeFile(SUCCESS_FILE_NAME, JSON.stringify(successes), err =>
                 { if (err) console.error(err);
                   else console.log("Saved successes file");
                 });
});

// TODO: loop over all queries, see which ones gave some result (no transfers), put in graph.

