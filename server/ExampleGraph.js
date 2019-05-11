const sugg = require("./Suggester.js");

const graphy = require("@dagrejs/graphlib");

const g = new graphy.Graph({directed : false});

g.setEdge("Goteborg", "Stockholm", 200);
g.setEdge("Orebro", "Stockholm", 10);
g.setEdge("Orebro", "Goteborg", 1000);
g.setEdge("Jonkoping", "Stockholm", 150);
g.setEdge("Goteborg", "Jonkoping", 70);


let suggestions = sugg.initialSuggestions("Goteborg", "Stockholm", g);
console.log(suggestions);
