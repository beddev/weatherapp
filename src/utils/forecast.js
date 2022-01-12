const request = require("postman-request");

// request ({ url: url, json: true }, (error, response) => {
//     
//     
// });

const forecast = (lat, long, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=715138d99e9a123d4a5aed7ec7932f62&query=" + lat + "," + long;

    // console.log(url)
         
        request({ url: url, json: true }, (error, response) => {
            const data = (response.body.current)
            if (error) {
                callback("Unable to connect to location services!", undefined)
            } else if (response.body.error) {
                callback("Unable to find location. Try another search!", undefined)
            } else {
                callback(undefined, data.weather_descriptions + ". It is currently " + data.temperature + " degrees C outside. However, it feels like..." + data.feelslike + "C!")
            }
        })
    }




module.exports = forecast;