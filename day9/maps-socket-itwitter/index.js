const express = require('express');
const  app = express();
const io = require('./socket')(app);

const bodyParser = require('body-parser');
const twit = require('./twitter');

app.set('view engine', 'ejs');
app.use(express.static('public'));
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.render('index', {});
});

io.on('connection', function (socket) {
    socket.emit('accepted', { status: 'ok' });
    socket.on('disconnect', function () {
        console.log('Client disconnected');
    });

    socket.on('geocode', data => {
        const lat = data.lat;
        const lng = data.lng;
        twit.search(`${lat},${lng}`);
    });
});

io.server.listen(port, () => console.log(`Twitter app listening on port ${port}!`));
