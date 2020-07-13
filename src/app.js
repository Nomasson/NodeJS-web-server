const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define the paths, and views for Express config
app.set('views', path.join(__dirname, "../templates/views"))
app.set('view engine', 'hbs' )
hbs.registerPartials(path.join(__dirname, "../templates/partials"))

// Setup static directory
app.use(express.static(path.join(__dirname,'../public')))

app.get('', (req,res) => {
    res.render('index', {
        title: "Weather app",
        name: "Noam Ossia"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: "About me",
        name: "Noam Ossia",

        
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: "This content is here to help the lost user",
        title: "Help"
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address
    if(!address){
        return res.send({
            error: 'Address is required'
        })
        }    else {
        geocode(address, (error,{latitude,longtitude,location} = {})=>{
    
            if (error){
                return console.log(error)
            }
        
            forecast(latitude,longtitude, (error, forecastData) => {
                if (error){
                    return console.log(error)
                }
                
                console.log(location)
                console.log(forecastData)
                res.send({
                    
                    address,
                    location,
                    forecastData
                
                })
            })
         
        })
    }


})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must enter a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
   res.render('error', {
       title: "404",
       error: "Cannot fetch the help article"
   })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: "404",
        error: "Cannot access this page"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})