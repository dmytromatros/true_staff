'use strict';

module.exports = async (req, res) => {

    const { login, password } = req.body;
    let error = [];

    let copmany;

    try {
        copmany = await req.app.db.collection('companies').findOne({ login });

        if (copmany) {

            const isPasswordMatch = copmany.password === password;

            if (!isPasswordMatch) {
                error.push('Incorrect password');
            }
        } else {
            error.push('Company not found');
        }

    } catch (error) {
        error.push(error);
    }

    if (!error.length) {
        res.status(200).json({
            data: copmany,
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}