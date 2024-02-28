'use strict';

module.exports = async (req, res) => {

    const { name, login, password } = req.body;
    let error = [];

    if (name == '' || name == undefined) error.push('Введіть ім\'я');
    if (login == '' || login == undefined) error.push('Придумайте та введіть логін');
    if (password == '' || password == undefined) error.push('Придумайте та введіть пароль');

    let nameCheck, loginCheck;

    if (error.length === 0) {
        try {

            nameCheck = await req.app.db.collection('companies').findOne({ name });
            if (nameCheck) error.push('Компанія з таким ім\'ям вже зареєстрована');

            loginCheck = await req.app.db.collection('companies').findOne({ login });
            if (loginCheck) error.push('Компанія з таким ЄДРПОУ/РНОПКК вже зареєстрована');


        } catch (err) {
            error.push(err);
        }
    }

    let newCompany = req.body

    newCompany.isImage = false

    let newCompanyId;


    if (error.length === 0) {
        try {
            const result = await req.app.db.collection('companies').insertOne(newCompany);
            newCompanyId = result.insertedId
        } catch (err) {
            error.push(err);
        }
    }

    let currentCompany;

    if (error.length === 0) {
        try {
            currentCompany = await req.app.db.collection('companies').findOne({
                _id: newCompanyId
            },);
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            message: 'Ви успішно зареєструвались!',
            data: currentCompany,
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}