'use strict';

const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {

    let error = [];

    if (!req.params.id) error.push('Id is required');

    let user;

    const objectId = new ObjectId(req.params.id);

    if (error.length === 0) {
        try {
            user = await req.app.db.collection('users').findOne({
                _id: objectId
            },);
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            success: true
        });
    } else {
        res.status(417).json({
            message: 'No users found !!!',
            success: false
        });
    }
}