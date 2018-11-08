const express = require('express');
const app = express();
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
  res.json({
    tarakan: req.chanj,
    hakob: "TEST API!",
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));