const Twit = require('twit');

const T = new Twit({
consumer_key:         'jaec1gzjvUEH3m0rBzI0lesWe',
consumer_secret:      'Yl2ruQYn4yAI92cCrQ7E1ycdoF8a5kJJxKB1KkJ0EekvzqXvPg',
access_token:         '3003116730-sL8ICd3r19woBjqwqmlgXasNzMzhwJj5Ej6iO9Q',
access_token_secret:  'PXLnuElROCTOjNAyEwEOap7sDamKrTFI42apzrGYOi7Km',
    timeout_ms:           60*1000,
    strictSSL:            true,
});

const OldStatuses = {}; // KEY: query, Value: [statuses]

const searchTweet = (query, callback) => {
    T.get('search/tweets', { q: `${query} since:2018-07-11`, count: 1000 }, (err, data, response)=> {
        if (err) {
            console.log('ERROR: ', err);
            return;
        }
        if (!(query in OldStatuses)) {
            OldStatuses[query] = [];
        }
        for (let i = 0; i < data.statuses.length; i++) {
            const newId = data.statuses[i].id;
            let isEqual = false;
            for (let j = 0; j < OldStatuses[query].length; j++) {
                const oldId = OldStatuses[query][j].id;
                if (oldId === newId) {
                    isEqual = true;
                    break;
                }
            }

            if (!isEqual) {
                OldStatuses[query] = data.statuses;
                break;
            }
        }
    });
};

const queries = [];
let index = -1;

setInterval(() => {
    if (index < 0 && queries.length === 0) return;

    index++;
    if (index >= queries.length) {
        index = 0;
    }

    console.log(index, queries[index], queries.length);

    searchTweet(queries[index], (tweets) => {
        console.log(tweets);
    });
}, 2000);

module.exports = {
    search(query, callback) {
        if (queries.indexOf(query) === -1) {
            queries.unshift(query);
        }
    }
};
