'use strict';

module.exports = async (req, res) => {

    const { name, surname, email, password } = req.body;
    let error = [];

    let nameCheck, surnameCheck, emailCheck, passwordCheck;

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

    if (error.length === 0) {
        try {
            await req.app.db.collection('users').insertOne(req.body);
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