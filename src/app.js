const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//configure express to serve up the directory
//this will customise the server

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//app.get takes in two arguments -> first is the route, second is the 
//function which describes what we want to do when someone visits the route
//'res' can send both html and json data
app.get('',(req,res)=>{
    //views help us to use dynamic content
    //to render a view and then converting it into html file
    //first argument is the file, the second argument is an object that a view can access
    res.render('index',{
        title:'Weather',
        name: 'Dipti Agarwal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        paragraph:'Hello there. We are here to help you 24x7.',
        title:'Help',
        name:'Dipti Agarwal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Dipti Agarwal'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

    // res.send({
    //     forecast:'50 degrees',
    //     location:'philadelphia',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Help',
        name:'Dipti Agarwal',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Dipti Agarwal',
        errorMessage:'Page Not Found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})