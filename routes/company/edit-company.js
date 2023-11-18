'use strict';

const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {

    let error = [];

    if (!req.body.id) error.push('Id is required');

    let company;

    const objectId = new ObjectId(req.body.id);

    let updateData = {};

    if (error.length === 0) {
        if (req.body.name) updateData.name = req.body.name;
        if (req.body.password) updateData.password = req.body.password;
    }

    let result;

    if (error.length === 0) {
        try {
            result = await req.app.db.collection('companies').updateOne(
                { _id: objectId },
                { $set: updateData }
            );
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        try {
            company = await req.app.db.collection('companies').findOne(
                {
                    _id: objectId
                }
            );
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            data: { ...company },
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}