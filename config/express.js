/**
 * Created by nsm1211 on 2/5/17.
 */

const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mustacheExpress = require('mustache-express');


module.exports = () => {

    const app = express();

    enviromentSetting(app);
    middleWareSetting(app);
    viewTemplateSetting(app);

    const indexRoutes = require('../app/routes/index.server.routes');
    indexRoutes(app);

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
};

viewTemplateSetting = (app) => {
    app.engine('mustache', mustacheExpress());
    app.set('view engine', 'mustache');
    app.set('views', './app/views');
};
