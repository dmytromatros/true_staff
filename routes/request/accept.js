'use strict';

const { ObjectId } = require('mongodb');

module.exports = async(req, res) => {

    let error = [];

    if (!req.body.id) error.push('Request id is required');
    if (!req.body.type) error.push('Request type is required');

    let request;

    const objectId = new ObjectId(req.body.id);

    let updateData = {};

    updateData.accepted = true

    if (req.body.type == 1) updateData.companyDeleted = true
    if (req.body.type == 2) updateData.userDeleted = true

    //  Update request

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

    //  Create new workplace


    if (error.length === 0) {
        try {
            await req.app.db.collection('workplaces').insertOne({
                companyId: currentRequest.companyId,
                companyName: currentRequest.companyName,
                locationId: currentRequest.locationId,
                locationAddress: currentRequest.locationAddress,
                employeeId: currentRequest.employeeId,
                employeeName: currentRequest.employeeName,
                position: currentRequest.position,
                deleted: false
            });
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            message: 'Request has been accepted',
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}