'use strict';

const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {

    let error = [];

    if (!req.params.id) error.push('ВВедіть ID користувача');

    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
        error.push('Введіть коректний ID користувача');
    }

    let user;

    let objectId;


    if (error.length === 0) {
        objectId = new ObjectId(req.params.id);
    }

    if (error.length === 0) {
        try {
            user = await req.app.db.collection('users').findOne({
                _id: objectId
            },);
        } catch (err) {
            error.push('Користувача з таким ID не існує');
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}