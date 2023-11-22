'use strict';

exports = module.exports = (app) => {

    // System

    app.post('/api/registration', require('./routes/system/registration'))
    app.post('/api/login-user', require('./routes/system/loginUser'))
    app.post('/api/login-company', require('./routes/system/loginCompany'))

    // Users

    app.get('/api/get-user-list', require('./routes/employee/get-employees'))
    app.post('/api/add-user', require('./routes/employee/add-user'))
    app.get('/api/get-user/:id', require('./routes/employee/get-user'))
    app.post('/api/edit-user', require('./routes/employee/edit-user'))
    app.post('/api/send-user-request', require('./routes/employee/send-request'))

    // Company

    app.post('/api/add-company', require('./routes/company/add-company'))
    app.get('/api/get-company/:id', require('./routes/company/get-company'))
    app.post('/api/edit-company', require('./routes/company/edit-company'))
    app.post('/api/edit-company-password', require('./routes/company/edit-password'))
    app.post('/api/send-company-request', require('./routes/company/send-request'))
    app.get('/api/get-list', require('./routes/company/get-list'))


    // Location
    app.get('/api/get-locations/:companyId', require('./routes/location/get-locations'))
    app.post('/api/add-location', require('./routes/location/add-location'))
    app.get('/api/get-location/:locationId', require('./routes/location/get-location'))
    app.post('/api/edit-location', require('./routes/location/edit-location'))


    // Employees

    app.get('/api/get-employees', require('./routes/employee/get-employees'))

}