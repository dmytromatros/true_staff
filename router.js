'use strict';

exports = module.exports = (app) => {

    // System

    app.post('/api/login-user', require('./routes/system/loginUser'))
    app.post('/api/login-company', require('./routes/system/loginCompany'))

    // Users

    app.get('/api/get-user-list', require('./routes/employee/get-employees'))
    app.post('/api/add-user', require('./routes/employee/add-user'))
    app.get('/api/get-user/:id', require('./routes/employee/get-user'))
    app.get('/api/get-current-user/:id', require('./routes/employee/get-current-user'))
    app.post('/api/find-by-name', require('./routes/employee/find-by-name'))
    app.get('/api/check-user/:id', require('./routes/employee/check-user'))
    app.get('/api/get-user-info/:id', require('./routes/employee/get-user-info'))
    app.post('/api/edit-user', require('./routes/employee/edit-user'))
    app.post('/api/edit-employee', require('./routes/employee/edit-employee'))
    app.post('/api/send-user-request', require('./routes/employee/send-request'))
    app.post('/api/edit-user-password', require('./routes/employee/edit-password'))

    // Company

    app.post('/api/add-company', require('./routes/company/add-company'))
    app.get('/api/get-current-company/:id', require('./routes/company/get-current-company'))
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
    app.post('/api/delete-location/:id', require('./routes/location/delete-location'))

    app.get('/api/get-location-employees/:id', require('./routes/location/get-location-employees'))

    // Employees

    app.get('/api/get-employees/:location', require('./routes/employee/get-employees'))



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

    // Reviews

    app.post('/api/send-review', require('./routes/reviews/send-review'));
    app.get('/api/get-reviews-list/:id', require('./routes/reviews/get-reviews-list'));
    app.post('/api/edit-review', require('./routes/reviews/edit-review'));
    app.post('/api/delete-review/:id', require('./routes/reviews/delete-review'));

}