const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const port = process.env.PORT || 3000;
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const indexRouter = require('./resources/routers/index');
const moment = require('moment');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('tkh'));
app.use(session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.engine(
    'hbs',
    handlebars.engine({
        extname: 'hbs',
        helpers: {
            eq: function (a, b, options) {
                if (a === b) return options.fn(this);
                return options.inverse(this);
            },
            let: function (name, value, options) {
                options.data.root[name] = value;
            },
            formatDate: function (date, format) {
                return moment(date).format(format);
            },
            equal: function (a, b) {
                return a == b;
            },
            capitalize: function (str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Router
app.use('/', indexRouter);

app.listen(port, () => console.log('Client started in http://localhost:3000'));
