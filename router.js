'use strict';

exports = module.exports = (app) => {

    // System

    app.post('/api/registration', require('./routes/system/registration'))
    app.post('/api/login', require('./routes/system/login'))

    // Users

    app.get('/api/get-user-list', require('./routes/user/get-user-list'))
}
