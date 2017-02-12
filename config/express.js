/**
 * Created by nsm1211 on 2/5/17.
 */

const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const config = require('./config');

module.exports = () => {

    const app = express();

    enviromentSetting(app);
    middleWareSetting(app);
    viewTemplateSetting(app);

    require('../app/routes/index.server.routes')(app);

    require('../app/routes/employee.server.routes')(app);

    app.use(express.static('./public'));

    return app;
};

enviromentSetting = function (app) {
    if (process.env.NODE_ENV == 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV == 'production') {
        app.use(compress());
    }
};

middleWareSetting = function (app) {
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        secret: config.sessionSecret,
        saveUninitialized: true,
        resave: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
};

viewTemplateSetting = (app) => {
    app.engine('mustache', mustacheExpress());
    app.set('view engine', 'mustache');
    app.set('views', './app/views');
};
