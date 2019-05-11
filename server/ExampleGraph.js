const sugg = require("./Suggester.js");

const graphy = require("@dagrejs/graphlib");

const g = new graphy.Graph({directed : false});

g.setEdge("Goteborg", "Stockholm", { minutes: 200});
g.setEdge("Orebro", "Stockholm", { minutes: 10});
g.setEdge("Orebro", "Goteborg", { minutes: 1000});
g.setEdge("Jonkoping", "Stockholm", { minutes: 150});
g.setEdge("Goteborg", "Jonkoping", { minutes: 70});


let suggestions = sugg.initialSuggestions("Goteborg", "Stockholm", g);
console.log(suggestions);
