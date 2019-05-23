const express = require("express")
const app = express()
const port = 3000
const hbs = require('express-handlebars');
const path = require('path')
const compression = require('compression')
const bodyParser = require('body-parser')
const fs = require("fs")

// compression middleware
app.use(compression())
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'max-age=' + 365 * 24 * 60 * 60);
    next();
});

app.use(function (req, res, next) {
    res.locals = {
        cssFilePath: revUrl("/dist/uikit.css"),
        cssFilePathCustom: revUrl("/dist/custom.css"),
        jsFilepath: revUrl("/dist/uikit.js")
    };
    next();
});


// static files serving
app.use(express.static(path.join(__dirname, '/public')));


//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname +
    '/views/layouts/',
    partialsDir: __dirname +
    '/views/partials/'
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import routes
const indexRouter = require('./routes/index');
const catList = require('./routes/catList');
const recipeDetail = require('./routes/recipe');

// routes
app.get('/', indexRouter)
app.get('/offline', (req, res) => {
    res.render('offline', {
        layout: 'default'
    });
})
app.get('/:cat', catList)
app.get('/recipe/:id', recipeDetail)

// server listening to port
const server = app.listen(process.env.PORT || 3000, _ => {
    console.log("listening on port 3000")
})

function revUrl(url) {
    let fileName = JSON.parse(fs.readFileSync("public/rev-manifest.json", 'utf8'))
    return fileName[url]
}