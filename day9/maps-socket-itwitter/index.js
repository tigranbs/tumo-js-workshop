const express = require('express');
const bodyParser = require('body-parser');
const twit = require('./twitter');


const  app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.render('index', {});
});

app.post('/search', (req, res) => {
    const lat = req.body.lat;
    const lng = req.body.lng;
    twit.search(`${lat},${lng}`, statuses => {
        res.json({ search: statuses });
    });
});

app.listen(port, () => console.log(`Twitter app listening on port ${port}!`));
