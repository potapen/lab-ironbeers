const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    const dataBeers = {
      beers: beersFromApi
    }
    res.render('beers',dataBeers);
  })
  .catch(error => console.log(error));
});


app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(beerFromApi => {
    const randomBeer = {
      beer: beerFromApi[0]
    }
    res.render('random-beer',randomBeer);
  })
  .catch(error => console.log(error));
});


app.get('/beer/:oneBeer', (req, res) => {
  let id = req.params.oneBeer
  console.log('req.params.name: ',id)
  punkAPI
  .getBeer(id)
  .then(apiResponse => {
    console.log('apiResponse: ', apiResponse)
    const specificBeer = {
      beer: apiResponse[0]
    }
    res.render('beerDetails',specificBeer);
  })
  .catch(error => console.log(error));
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
