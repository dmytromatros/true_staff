'use strict';

const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {

    let error = [];

    if (!req.body.id) error.push('Id is required');

    let user;

    const objectId = new ObjectId(req.body.id);

    let updateData = {};

    if (error.length === 0) {
        if (req.body.name) updateData.name = req.body.name;
        if (req.body.surname) updateData.surname = req.body.surname;
        if (req.body.image) updateData.image = req.body.image;
        if (req.body.isEmployee == false || req.body.isEmployee == true) updateData.isEmployee = req.body.isEmployee;
    }

    let result;

    if (error.length === 0) {
        try {
            result = await req.app.db.collection('users').updateOne({ _id: objectId }, { $set: updateData });
        } catch (err) {
            error.push('Не вийшло оновити дані. Спробуйте ще раз');
        }
    }


    if (error.length === 0) {
        try {
            user = await req.app.db.collection('users').findOne({
                _id: objectId
            });
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            data: { ...user },
            message: 'Інформацію оновлено',
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}