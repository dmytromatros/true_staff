'use strict';

exports = module.exports = (app) => {
    app.get('/api/get-user-list', require('./routes/get-user-list'))
}
