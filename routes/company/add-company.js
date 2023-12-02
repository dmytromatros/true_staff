'use strict';

module.exports = async(req, res) => {

    const { name, login, password } = req.body;
    let error = [];

    if (name == '' || name == undefined) error.push('Name is required');
    if (password == '' || password == undefined) error.push('Password is required');
    if (login == '' || login == undefined) error.push('Login is required');

    let nameCheck, loginCheck;

    if (error.length === 0) {
        try {

            nameCheck = await req.app.db.collection('companies').findOne({ name });
            if (nameCheck) error.push('The company with such a name is already registered');

            loginCheck = await req.app.db.collection('companies').findOne({ login });
            if (loginCheck) error.push('The company with such a login is already registered');


        } catch (err) {
            error.push(err);
        }
    }

    let newCompany = req.body

    newCompany.isImage = false

    if (error.length === 0) {
        try {
            await req.app.db.collection('companies').insertOne(newCompany);
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            message: 'Company has beed registered!',
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}