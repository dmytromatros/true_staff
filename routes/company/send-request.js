'use strict';

const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {

    req.body;
    let error = [];

    if (!req.body.locationId || !req.body.locationAddress) error.push('Location is required');
    if (!req.body.companyId || !req.body.companyName) error.push('Company is required');
    if (!req.body.employeeId) error.push('Receiver is required');
    if (!req.body.message) error.push('Message is required');
    if (!req.body.position) error.push('Position is required');

    // Check the user

    let user;

    if (error.length === 0) {
        const objectId = new ObjectId(req.body.employeeId);

        console.log(objectId)

        try {
            user = await req.app.db.collection('users').findOne({
                _id: objectId
            },);
        } catch (err) {
            error.push('No such user')
        }
    }

    // Check if the company includes the user

    let workplace;

    if (error.length === 0) {

        workplace = await req.app.db.collection('workplaces').findOne({
            companyId: req.body.companyId,
            // locationId: req.body.locationId,
            employeeId: req.body.employeeId,
            deleted: false
        });

        if (workplace) error.push('The employee is already in the company!');

    }

    // Check if the user in an employee

    if (error.length === 0) {
        if (!user.isEmployee) error.push('The user is not an employee!');
    }

    // Add new request


    let existingRequest;

    if (error.length === 0) {
        try {
            existingRequest = await req.app.db.collection('requests').findOne({
                type: 2,
                companyId: req.body.companyId,
                // locationId: req.body.locationId,
                employeeId: req.body.employeeId,
                rejected: false
            });
            if (existingRequest) {
                error.push('There is already an employee request with the same details');
            }
        } catch (err) {
            error.push('Error checking for existing request');
        }
    }

    let existingCompanyRequest;

    if (error.length === 0) {
        try {
            existingCompanyRequest = await req.app.db.collection('requests').findOne({
                type: req.body.type,
                companyId: req.body.companyId,
                // locationId: req.body.locationId,
                employeeId: req.body.employeeId,
                rejected: false
            });
            if (existingCompanyRequest) {
                error.push('There is already a company request with the same details');
            }
        } catch (err) {
            error.push('Error checking for existing company request');
        }
    }

    let sendData;

    if (error.length === 0) {

        sendData = { ...req.body }
        sendData.accepted = false
        sendData.rejected = false
        sendData.companyDeleted = false
        sendData.userDeleted = false

        try {
            await req.app.db.collection('requests').insertOne(sendData);
        } catch (err) {
            error.push(err);
        }
    }

    if (error.length === 0) {
        res.status(200).json({
            message: 'Request has been sent!',
            success: true
        });
    } else {
        res.status(417).json({
            message: error[0],
            success: false
        });
    }
}