'use strict';

module.exports = async(req, res) => {

    const { name, surname, email, password } = req.body;
    let error = [];

    if (name == '' || name == undefined) error.push('Name is required');
    if (password == '' || password == undefined) error.push('Password is required');
    if (email == '' || email == undefined) error.push('Email is required');

    let nameCheck, surnameCheck, emailCheck;

    if (error.length === 0) {
        try {

            nameCheck = await req.app.db.collection('users').findOne({ name });
            if (nameCheck) error.push('The user with such a name is already registered');

            surnameCheck = await req.app.db.collection('users').findOne({ surname });
            if (surnameCheck) error.push('The user with such a surname is already registered');

            emailCheck = await req.app.db.collection('users').findOne({ email });
            if (emailCheck) error.push('The user with such an email is already registered');


        } catch (error) {
            error.push(error);
        }
    }

    let newUser = req.body

    newUser.isImage = false

    if (error.length === 0) {
        try {
            await req.app.db.collection('users').insertOne(newUser);
        } catch (error) {
            error.push(error);
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            message: 'User has beed registered!',
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}