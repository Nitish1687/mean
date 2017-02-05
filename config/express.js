/**
 * Created by nsm1211 on 2/5/17.
 */

const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


module.exports = () => {

    const app = express();

    enviromentSetting(app);
    middleWareSetting(app);

    const indexRoutes = require('../app/routes/index.server.routes');

    indexRoutes(app);

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
};
