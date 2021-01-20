const express = require('express');
require('dotenv').config()
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
// const mysql = require('mysql');
const routes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');

const session = require('express-session');
const flash = require('connect-flash')

// const db = mysql.createConnection({
//     host: process.env.HOST,
//     user     : process.env.USER,
//     password : process.env.PASSWORD,
//     database : process.env.DATABASE
// });

// Connect
// db.connect((err)=> {
//     if(err){
//         throw err;
//     }
//     console.log('Mysql connected...');
// });

// Init app 
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set Template Engine
app.use(expressLayouts);
app.set('layout', './layouts/front_layout');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use('/assets', express.static('assets'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret001',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


// app.get('/', (req, res) => res.send('Hello'));
app.use('/', routes);
app.use('/admin', adminRoutes);

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server running on port ${port}`));