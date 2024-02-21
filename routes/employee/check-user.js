'use strict';

const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {

    let error = [];

    if (!req.params.id) error.push('ВВедіть ID користувача');

    let user;


    if (error.length === 0) {
        try {
            user = await req.app.db.collection('users').findOne({
                uniqueId: req.params.id
            }, {
                projection: {
                    _id: 1
                }
            });
        } catch (err) {
            error.push('Користувача з таким ID не існує');
        }
    }



    if (error.length === 0 && user) {
        res.status(200).json({
            data: user,
            success: true
        });
    } else {
        res.status(417).json({
            message: ['Користувача з таким ID не існує'],
            success: false
        });
    }
}