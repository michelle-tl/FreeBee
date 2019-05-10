// Pre-computes the graph of all major european cities and the train net between them.

const countries = require('countries-list');
const cities    = require('all-the-cities');
const interrail = require('interrail');
const async     = require('async');
const fs        = require('fs');

// Sort out very small cities.
const CITY_MIN_POPULATION = 50000;

// A list of all country codes in Europe, e.g., SE for Sweden.
const europeanCountryCodes =
    Object.entries(countries.countries)
      .filter(([k, v]) => v.continent == 'EU')
      .map(([k, _]) => k);

// A list of all cities in Europe (with some extra data). Cities with small
// populations are filtered out.
const europeanCities =
    cities
      .filter(c => europeanCountryCodes.indexOf(c.country) != -1)
      .filter(c => c.population >= CITY_MIN_POPULATION)
      .map(c => {
          c['countryName'] = countries.countries[c.country].name;
          return c;
      });

// For every city, do a best-effort attempt at getting a train station from
// interrail for it. Since this is a text-based search, in some cases we will
// end up with cities missing, or incorrectly labeled.
const queries = europeanCities.map((city) =>
                                   (callback) =>
           interrail.stations.search(city.name + " " + city.countryName, {results: 1})
           .then(res => {
               if (res.length > 0)
                   callback(null, {'station' : res[0], 'city': city});
               else
                   callback(null, {});
           })
          );

async.parallel(queries, (err, res) => fs.writeFile("Stations.json", JSON.stringify(res), err =>
                                                   { if (err) console.log(err);
                                                     else console.log("Saved file");
                                                   }));
