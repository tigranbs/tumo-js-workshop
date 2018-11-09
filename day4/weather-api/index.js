const express = require('express');
const bodyParser = require('body-parser');
const weather = require('./weather');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const port = 3000;

app.set('view engine', 'ejs');

app.use((req, res, next) => { // middleware
  req.chanj = Math.random();
  next();
});

app.get('/', (req, res) => {
  res.render('index', { hakob: 'HAKOB!!' });
});

app.post('/exp', (req, res) => {
  const location = req.body.location;
  weather.location(location, woeid => {
      if (woeid) {
          weather.temperature(woeid, temp => {
              res.json({ temperature: temp });
          });
      } else {
          res.json({ temperature: 'No Location!' });
      }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
