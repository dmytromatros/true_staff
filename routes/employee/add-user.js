'use strict';

module.exports = async (req, res) => {

    const { name, surname, email, password } = req.body;
    let error = [];

    if (name == '' || name == undefined) error.push('Введіть ім\'я');
    if (email == '' || email == undefined) error.push('Введіть ваш Email');
    if (password == '' || password == undefined) error.push('Придумайте та введіть пароль');

    let nameCheck, surnameCheck, emailCheck;

    if (error.length === 0) {
        try {

            emailCheck = await req.app.db.collection('users').findOne({ email });
            if (emailCheck) error.push('Користувач з таким Email вже зареєстрований');

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
            message: 'Ви успішно зареєстувались!',
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}