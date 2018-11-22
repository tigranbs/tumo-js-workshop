const Twit = require('twit');
const io = require('./socket')();

const T = new Twit({
    consumer_key:         'BSOXczVHwbmAi6XWtQ5OAiuG0',
    consumer_secret:      'fmRzZhYmtTock2ekoegt3ZnLy4ocxEAN8RnnOJMNox0VnbvZlw',
    access_token:         '3003116730-cgV74NOk4HtNy47Tb6PHXY901wq9QxSHk7DlNmj',
    access_token_secret:  'KAI1EukeujwicwyVTaciIiG7sWS2uOkypa8DzB8FXbqMQ',
    timeout_ms:           60*1000,
    strictSSL:            true,
});

const OldStatuses = {}; // KEY: query, Value: [statuses]

const searchTweet = (query, callback) => {
    T.get('search/tweets', { geocode: `${query},5km`, count: 1000 }, (err, data, response)=> {
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
                io.sockets.emit(query, { statuses: data.statuses });
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

    searchTweet(queries[index], (tweets) => {
        console.log(tweets);
    });
}, 2000 * 60);

module.exports = {
    search(query) {
        if (queries.indexOf(query) === -1) {
            queries.unshift(query);
        }
    }
};
