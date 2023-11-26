'use strict';

const { ObjectId } = require('mongodb');

module.exports = async(req, res) => {

    req.body;
    let error = [];

    if (!req.body.companyId) error.push('Company is required');
    if (!req.body.locationId) error.push('Location is required');
    if (!req.body.position) error.push('Position is required');
    if (!req.body.message) error.push('Message is required');
    if (!req.body.employeeId || !req.body.employeeName) error.push('Employee info is required');

    // Check the user

    let company;

    if (error.length === 0) {
        const objectId = new ObjectId(req.body.company);


        try {
            company = await req.app.db.collection('companies').findOne({
                _id: objectId
            }, );
        } catch (err) {
            error.push('No such company')
        }
    }

    // Check the location

    let location;

    if (error.length === 0) {
        const objectId = new ObjectId(req.body.location);


        try {
            location = await req.app.db.collection('locations').findOne({
                _id: objectId
            }, );
        } catch (err) {
            error.push('No such company')
        }
    }

    // Check if the company includes the user

    let user;


    if (error.length === 0) {
        const objectId = new ObjectId(req.body.employeeId);


        try {
            user = await req.app.db.collection('users').findOne({
                _id: objectId
            }, );
        } catch (err) {
            error.push('No such user')
        }
    }

    let workplace;

    if (error.length === 0) {
        workplace = await req.app.db.collection('workplaces').findOne({
            companyId: req.body.companyId,
            // locationId: req.body.location,
            employeeId: req.body.employeeId,
            deleted: false
        })
        if (workplace) error.push('The account is already in the company!');
    }

    let existingRequest;

    if (error.length === 0) {
        try {
            existingRequest = await req.app.db.collection('requests').findOne({
                type: req.body.type,
                companyId: req.body.companyId,
                // locationId: req.body.locationId,
                employeeId: req.body.employeeId,
                rejected: false
            });
            if (existingRequest) {
                error.push('There is already a request with the same details');
            }
        } catch (err) {
            error.push('Error checking for existing request');
        }
    }

    let existingCompanyRequest;

    if (error.length === 0) {
        try {
            existingCompanyRequest = await req.app.db.collection('requests').findOne({
                type: 1,
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

    // Add new request

    let sendData;

    if (error.length === 0) {

        sendData = {...req.body }
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
            message: error,
            success: false
        });
    }
}