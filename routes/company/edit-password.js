'use strict';

const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {

    let error = [];

    if (!req.body.id) error.push('Id is required');
    if (!req.body.oldPass) error.push('Old password is required');
    if (!req.body.newPass) error.push('New password is required');

    let company;

    const objectId = new ObjectId(req.body.id);

    let updateData = {};

    if (error.length === 0) {
        if (req.body.newPass) updateData.password = req.body.newPass;
    }

    let check;

    if (error.length === 0) {
        check = await req.app.db.collection('companies').findOne({
            _id: objectId,
            password: req.body.oldPass
        });

        if (!check) {
            error.push('Incorrect old password')
        }
    }

    if (error.length === 0 && check) {
        try {
            await req.app.db.collection('companies').updateOne(
                { _id: objectId, password: req.body.oldPass },
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
};
