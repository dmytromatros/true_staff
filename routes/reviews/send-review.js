'use strict';

module.exports = async (req, res) => {

    console.log(req.body)

    const { to, from, review, date } = req.body;

    let error = [];

    // if (company == '' || company == undefined) error.push('company is required');
    // if (location == '' || location == undefined) error.push('location is required');
    if (from == '' || from == undefined) error.push('from is required');
    if (review == '' || review == undefined) error.push('Заповнять поле для відгуку');
    if (to == '' || to == undefined) error.push('to is required');
    if (date == '' || date == undefined) error.push('date is required');


    if (error.length === 0) {
        try {
            await req.app.db.collection('reviews').insertOne(req.body);
        } catch (err) {
            error.push('Не вдалось відправити відгук. Спробуйте ще раз)');
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            message: 'Відгук відправлено!',
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}