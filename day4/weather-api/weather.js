const request = require('request');
const WeatherURL = 'https://www.metaweather.com/api/location';
module.exports = {
    location(query, callback) {
        request(`${WeatherURL}/search/?query=${query}`, function (error, response, body) {
            if (error) {
                console.log('Unhandled API Error: ', error);
                callback(null);
            } else {
                try {
                    const data = JSON.parse(body);
                    if (data && data.length >= 1 && data[0].woeid) {
                        callback(data[0].woeid);
                        return;
                    }
                } catch (e) {
                    console.log("TRY-Catch Error - ", e);
                }

                callback(null);
            }
        });
    },
    temperature(woeid, callback) {
        request(`${WeatherURL}/${woeid}`, function (error, response, body) {
            if (error) {
                console.log('Unhandled API Error: ', error);
                callback(null);
            } else {
                const data = JSON.parse(body);
                callback(data["consolidated_weather"][0].the_temp);
            }
        });
    }
};
