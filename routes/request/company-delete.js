'use strict';

const { ObjectId } = require('mongodb');

module.exports = async(req, res) => {

    let error = [];

    if (!req.body.id) error.push('Request id is required');

    let request;

    const objectId = new ObjectId(req.body.id);

    let updateData = {};

    updateData.companyDeleted = true

    if (error.length === 0) {
        try {
            request = await req.app.db.collection('requests').updateOne({ _id: objectId }, { $set: updateData });
        } catch (err) {
            error.push(err);
        }
    }

    let currentRequest;


    if (error.length === 0) {
        try {
            currentRequest = await req.app.db.collection('requests').findOne({ _id: objectId });
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {

        if (currentRequest.userDeleted === true && currentRequest.companyDeleted === true) {
            try {
                await req.app.db.collection('requests').deleteOne({ _id: objectId });
            } catch (err) {
                error.push(err);
            }
        }

    }


    if (error.length === 0) {
        res.status(200).json({
            message: 'Request has been rejected',
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}