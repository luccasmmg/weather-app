const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode'); 
const forecast = require('./utils/forecast'); 

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine','hbs')
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'CC'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    text: '123456',
    name: "CC"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    text: 'Yo yo yo yo yo yo yo yo yo yo yo',
    name: "CC"
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address must be provided'
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => { 
      if(error) {
        return res.send({ error })
      }
      return res.send({ forecastData, location, latitude, longitude })
    });
  });
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    text: 'Help article not found',
    name: "CC"
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    text: 'Page not found',
    name: "CC"
  })
})

app.listen(port, () => {
  console.log('Server is up on port 3000.')
})

