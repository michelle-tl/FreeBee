// Pre-computes the graph of all major european cities and the train net between them.

const countries = require('countries-list');
const cities    = require('all-the-cities');
const interrail = require('interrail');
const async     = require('async');
const fs        = require('fs');

// Sort out very small cities.
const CITY_MIN_POPULATION = 50000;

const europeanCountryCodes =
    Object.entries(countries.countries)
      .filter(([k, v]) => v.continent == 'EU')
      .map(([k, _]) => k);

const europeanCities =
    cities
      .filter(c => europeanCountryCodes.indexOf(c.country) != -1)
      .filter(c => c.population >= CITY_MIN_POPULATION)
      .map(c => ({'name' : c.name, 'countryName': countries.countries[c.country].name} ));

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
