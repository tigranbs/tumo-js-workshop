const Twit = require('twit');

const T = new Twit({
    consumer_key:         '',
    consumer_secret:      '',
    access_token:         '',
    access_token_secret:  '',
    timeout_ms:           60*1000,
    strictSSL:            true,
});

T.get('search/tweets', { q: 'Աշոտյան since:2018-07-11', count: 1000 }, function(err, data, response) {
    if (err) {
        console.log('ERROR: ', err);
        return;
    }

    console.log(data.statuses);

    T.post('statuses/update', { status: data.statuses[0].text }, function(err1, data, response) {
        if (err1) {
            console.log('ERROR: ', err1);
            return;
        }
        console.log(data)
    });
});
