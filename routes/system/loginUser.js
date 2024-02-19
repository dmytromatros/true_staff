'use strict';

module.exports = async (req, res) => {

    const { email, password } = req.body;
    let error = [];

    let user;

    try {
        user = await req.app.db.collection('users').findOne({ email });

        if (user) {

            const isPasswordMatch = user.password === password;

            if (!isPasswordMatch) {
                error.push('Не правильний пароль');
            }
        } else {
            error.push('Користувача з таким логіном на паролем не знайдено');
        }

    } catch (error) {
        error.push(error);
    }

    if (!error.length) {
        res.status(200).json({
            data: user,
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}