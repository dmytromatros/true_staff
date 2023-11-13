'use strict';

exports = module.exports = (app) => {

    // System

    app.post('/api/registration', require('./routes/system/registration'))
    app.post('/api/login-user', require('./routes/system/loginUser'))
    app.post('/api/login-company', require('./routes/system/loginCompany'))

    // Users

    app.get('/api/get-user-list', require('./routes/user/get-user-list'))
    app.post('/api/add-user', require('./routes/user/add-user'))

    // Company

    app.post('/api/add-company', require('./routes/company/add-company'))

}
