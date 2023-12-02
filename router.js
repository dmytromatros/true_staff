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
    app.get('/api/get-company-employees/:id', require('./routes/company/get-company-employees'))
    app.post('/api/delete-employee', require('./routes/company/delete-employee'))


    // Location
    app.get('/api/get-locations/:companyId', require('./routes/location/get-locations'))
    app.post('/api/add-location', require('./routes/location/add-location'))
    app.get('/api/get-location/:locationId', require('./routes/location/get-location'))
    app.post('/api/edit-location', require('./routes/location/edit-location'))


    // Employees

    app.get('/api/get-employees', require('./routes/employee/get-employees'))



    // Requests


    app.get('/api/get-user-request-list/:id', require('./routes/employee/get-request-list'))
    app.get('/api/get-company-request-list/:id', require('./routes/company/get-request-list'))
    app.post('/api/reject-request', require('./routes/request/reject'))
    app.post('/api/user-delete-request', require('./routes/request/user-delete'))
    app.post('/api/company-delete-request', require('./routes/request/company-delete'))
    app.post('/api/accept-request', require('./routes/request/accept'))


    // Workspaces

    app.get('/api/get-workplaces/:employeeId', require('./routes/workplaces/get-workplaces'))


    // Files

    app.post('/api/upload-image', app.upload.single('file'), require('./routes/images/upload-image'));
    app.get('/api/get-image/:id', require('./routes/images/get-image'));

}