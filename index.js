const express=require('express');
const https=require('https')
const bodyParser=require('body-parser');
const { urlencoded } = require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');

   
})
app.post('/',(req,res)=>{
    const cityname=req.body.city;
    const apikey='8ca81e549ccf2e7d6d666a8346053b75';
    let url='https://api.openweathermap.org/data/2.5/weather?q='+cityname+'&appid='+apikey+'&units=metric'
    https.get(url,(response)=>{
        response.on('data',(data)=>{
            const weatherdata = JSON.parse(data);
            let temp=weatherdata.main.temp;
            let description=weatherdata.weather[0].description;
            let feelslike=weatherdata.main.feels_like;
            let humidity=weatherdata.main.humidity;
            let pressure=weatherdata.main.pressure;
        
            console.log(description)
            console.log(temp);
            params={temp:temp,description:description,humidity:humidity,pressure:pressure,feelslike:feelslike}
            res.render('home',params);
       


        })
    
    })

})
app.listen(3000,()=>{
    console.log("app is running on port 3000");
})