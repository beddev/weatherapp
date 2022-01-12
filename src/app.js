const path = require("path");
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "../public")
const partialsPath = path.join(__dirname, "../partials")

app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "David"
    })
})

app.get("/about", (req, res) => {
    res.render('about', {
        title: "About me",
        name: "david"
    })
})

app.get("/help", (req, res) => {
    res.render('help', {
        title: "Help page",
        example: "An example help message!",
        name: "david"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must provide an address search"
        })
    }

    geocode(req.query.address, (error, data = {}) =>{
        if(error) {
            return console.log(error)
        }
        console.log(data.location);
        
        forecast(data.latitude, data.longitude, (error, foredata) => {
            if(error) {
                return console.log(error)
            }
            console.log(foredata)

            res.send({
                forecast: foredata,
                location: data.location,
                address: req.query.address
            })            
          })
    });

    
})



app.get("*", (req, res) => {
    res.render("404", {})
})

app.listen(port, () => {
    console.log("server is running on port " + port)
}) 