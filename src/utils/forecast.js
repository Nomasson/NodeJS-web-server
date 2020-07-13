const request = require("postman-request")


const forecast = (long,lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9ff5a2dda966fc54fc9b41f1386193fc&query='+lat+','+long

    request({url, json:true}, (error,{body}) =>{
        if (error){
            callback("Unable to connect to the service", undefined)
        } else if (body.error) {
            callback("Unable to locate the location using those coordinations", undefined)
        }  else {
            callback(undefined, {
                temperature: body.current.temperature,
                wind_speed: body.current.wind_speed,
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast