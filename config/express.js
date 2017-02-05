/**
 * Created by nsm1211 on 2/5/17.
 */

const express = require('express');

module.exports = () => {

    const app = express();

    const indexRoutes = require('../app/routes/index.server.routes');

    indexRoutes(app);

    return app;
};
