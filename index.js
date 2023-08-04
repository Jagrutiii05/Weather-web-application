const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){
    // console.log("server update!")
    const cityName = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=382f89dd84b034e0754f256be4f5b0da&q=" + cityName + "&units=metric"
    https.get(url, function(response){
        response.on("data", function(data){
            

            var Wdata = JSON.parse(data);
            var temp = Wdata.main.temp;
            var desc = Wdata.weather[0].description;

            const icon = Wdata.weather[0].icon
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + desc + "<br></p>");
            res.write("<h2>The temperature in " + cityName + " is " + temp + "</h2>");
            res.write("<img src =" + imgURL + ">");

            res.send();
        })
    })
})

app.listen(3000, function(req, res){
    console.log("The server is running")
})