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
hbs.registerPartials(path.join(__dirname, 'views/partials/'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {

punkAPI
  .getBeers()
  .then((beersFromApi) => {
    // console.log('Beers from the database: ', beersFromApi)
    return beersFromApi;
  })
  .then((beers)=>{
    res.render('beers', { beers });
  })          
  .catch(error => console.log(error));

});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      // your magic happens here
      console.log(responseFromAPI)
      return responseFromAPI;
    })
    .then((randomBeer)=>{
      const beerRandom = randomBeer[0] 
      res.render('random-beer', beerRandom)
    })
    .catch(error => console.log(error));
  
});


app.get('/beers/:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then((response)=>{
      console.log(response);
      return response
    })
    .then((beer)=>{
      const selectedBeer = beer[0];
      res.render('selected-beer', selectedBeer)
    })
  // res.render('index');
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
