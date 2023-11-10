'use strict';

exports = module.exports = (app) => {
    app.use('/api/get-user-list', require('./routes/get-user-list'))
}
