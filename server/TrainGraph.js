const GRAPH_FILE_NAME = "TrainGraph.json";
const SUCCESS_FILE_NAME = "PairSuccesses.json";

const fs        = require('fs');
const interrail = require('interrail');
const async     = require('async');


const stationsDict = JSON.parse(fs.readFileSync("Stations.json"));
const stations = Object.values(stationsDict);

// For reproducability, always use this departure time when constructing the
// graph.
const DEPARTURE_DATE = new Date("2019-06-10T10:30:00+02:00");

// Load the existing graph: We want to extend it!
const graph = JSON.parse(fs.readFileSync(GRAPH_FILE_NAME));
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
        graph(graphKeys[i]).map(edge => succeses[[graphKeys[i], edge.byTrip.station.name]] = DONE);
    }
}


// Malmo to Lund, example:
// interrail.journeys("7402485", "7402611", {results: 1, transfers: 0, when: DEPARTURE_DATE}).then(console.log)
// Goteborg: 7401318
// Stockholm: 9900009

const queries = [];
var journeyOptions = {results: 1, transfers: 0, when: DEPARTURE_DATE};
for (let i = 0; i < stations.length; i++) {
    let from   = stations[i].station.name;
    let fromId = stations[i].station.id;
    for (let j = i+1; j < stations.length; j++) {
        let to   = stations[j].station.name;
        let toId = stations[j].station.id;

        // Skip already successful queries.
        if (successes[[from, to]] == DONE) continue;
        // Skip, but maybe extend later (with more dates, for example).
        if (successes[[from, to]] == NO_RES) continue;
        // We allow previously failed queries to go through.

        queries.push(callback =>
        interrail.journeys(fromId, toId, journeyOptions)
            .then(res => {
                if (res.length > 0) {
                    // Never repeat this query.
                    successes[[from, to]] = DONE;
                    console.log(res[0]);
                    callback(null, res[0]);
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

async.parallel(queries, (err, res) => {
    console.log(res);
    // Get rid of searches that gave no result.
    res = res.filter(s => s !== null);

    // Produce a graph (adjacency list).
    const stationNames = Object.keys(stationsDict);
    // Initially empty lists.
    for (let i = 0; i < stationNames.length; i++)
        graph[stationNames[i]] = [];

    for (let i = 0; i < res.length; i++) {
        let trip = res[i].legs[0]; // We guarantee to only ever have one leg.
        // Make the graph undirected: Same info in each edge.
        graph[trip.origin.name].push({'to': trip.destination.name, 'byTrip': trip});
        graph[trip.destination.name].push({'to': trip.origin.name, 'byTrip': trip});
    }
    fs.writeFile(GRAPH_FILE_NAME, JSON.stringify(graph), err =>
                 { if (err) console.log(err);
                   else console.log("Saved graph file");
                 });
});

// TODO: Make a stations dict with IDs as keys.
// TODO: loop over all queries, see which ones gave some result (no transfers), put in graph.

