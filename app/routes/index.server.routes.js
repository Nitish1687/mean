/**
 * Created by nsm1211 on 2/5/17.
 */

module.exports = (app) => {

    const index = require('../controllers/index.server.controller');

    app.get('/', index.render);
};
