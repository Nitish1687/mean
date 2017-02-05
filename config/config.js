/**
 * Created by nsm1211 on 2/5/17.
 */

module.exports = require('./env/'
    + process.env.NODE_ENV
    + '.js'
);
