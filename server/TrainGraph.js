const fs        = require('fs');
const interrail = require('interrail');

const stations = JSON.parse(fs.readFileSync("Stations.json"));

console.log(stations.length);

// For reproducability, always use this departure time when constructing the
// graph.
const DEPARTURE_DATE = new Date("2019-06-10T10:30:00+02:00");

var queries = [];

// Malmo to Lund, example:
// interrail.journeys("7402485", "7402611", {results: 1, transfers: 0, when: DEPARTURE_DATE}).then(console.log)

var journeyOptions = {results: 1, transfers: 0, when: DEPARTURE_DATE};
for (let i = 0; i < stations.length; i++) {
    let from = stations[i].station.id;
    for (let j = i+1; j < stations.length; j++) {
        let to = stations[j].station.id;
        let res = interrail.journeys(from, to, journeyOptions);
        queries.push({from: from, to: to, res: res});
    }
}

const graph = {};

const stationsDict = {};

for (let i = 0; i < stations.length; i++) {
    stationsDict[stations[i].station.id] = stations[i];
}

console.log(stationsDict);

// TODO: Make a stations dict with IDs as keys.
// TODO: loop over all queries, see which ones gave some result (no transfers), put in graph.

