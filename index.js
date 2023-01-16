const express=require('express');
const fs=require('fs')
const https=require('https')
const bodyParser=require('body-parser');
const { urlencoded } = require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
let cityname="ghaziabad";
const apikey='8ca81e549ccf2e7d6d666a8346053b75';
var url='https://api.openweathermap.org/data/2.5/weather?q='+cityname+'&appid='+apikey+'&units=metric'
https.get(url, (response)=>{
    response.on('data',(data)=>{
    var weatherdata = JSON.parse(data);
    var description=weatherdata.weather[0].description;
    var temperature=weatherdata.main.temp;
    var feelslike=weatherdata.main.feels_like;
    var humidity=weatherdata.main.humidity;
    var pressure=weatherdata.wind.speed;
    var location=weatherdata.name;
    var country=weatherdata.sys.country;
        console.log(temperature);
        console.log(location);
        console.log(description)
        params={temperature:temperature,description:description,humidity:humidity,windSpeed:pressure,location:location,feelslike:feelslike,country:country}
    })            
})
app.get('/',(req,res)=>{
    res.render('home',params) 
})
app.post('/',(req,res)=>{
    
     cityname=req.body.city;
    url='https://api.openweathermap.org/data/2.5/weather?q='+cityname+'&appid='+apikey+'&units=metric'
 
    https.get(url, (response)=>{   
        response.on('data',async(data)=>{        
            const weatherdata = JSON.parse(data);
            if(weatherdata.cod=="404"){
                console.log("Invalid City Name");
                const notifier = require('node-notifier');
                notifier.notify('Invalid City Name');
            }
            else{
            let temperature=weatherdata.main.temp;
            let description=weatherdata.weather[0].description;
            let feelslike=weatherdata.main.feels_like;
            let humidity=weatherdata.main.humidity;
            let pressure=weatherdata.wind.speed;
            let location=weatherdata.name;
            let country=weatherdata.sys.country;

            params={temperature:temperature,description:description,humidity:humidity,windSpeed:pressure,location:location,feelslike:feelslike,country:country}

            res.render('home',params);

            }
        })  
           
    })


})
app.listen(3000,()=>{
    console.log("app is running on port 3000");
})