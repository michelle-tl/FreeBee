// Pre-computes the graph of all major european cities and the train net between them.

const countries = require('countries-list');
const cities    = require('all-the-cities');
const interrail = require('interrail');

const CITY_MIN_POPULATION = 20000;

const europeanCountryCodes =
    Object.entries(countries.countries)
      .filter(([k, v]) => v.continent == 'EU')
      .map(([k, _]) => k);

const europeanCities =
    cities
      .filter(c => europeanCountryCodes.indexOf(c.country) != -1)
      .filter(c => c.population >= CITY_MIN_POPULATION)
      .map(c => c.name);
