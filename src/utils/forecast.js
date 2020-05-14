const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=2746754a3f28c0edf2996266b0fbe18e&query='+latitude+','+longitude+'&units=f'

    request({url, json:true},(error,{body})=>{
        if(error)
        {
            callback('unable to connect to the weather service',undefined)
        }
        else if(body.error)
        {
            callback('unable to find location',undefined)
        }
        else
        {
            callback(undefined, body.current.weather_descriptions[0]+ '. It is '+body.current.temperature+' degrees outside.')
        }
    })
}

module.exports=forecast