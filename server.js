const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const routes = require('./routes');

const session = require('express-session');
const flash = require('connect-flash')

const db = mysql.createConnection({
    host: 'localhost',
    user     : 'root',
    password : '',
    database : 'db_kb-intl'
});

// Connect
db.connect((err)=> {
    if(err){
        throw err;
    }
    console.log('Mysql connected...');
});

// Init app 
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.use(session({
    secret: 'secret001',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


// app.get('/', (req, res) => res.send('Hello'));
app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));