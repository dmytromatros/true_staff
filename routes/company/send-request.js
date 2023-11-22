'use strict';

const { ObjectId } = require('mongodb');

module.exports = async(req, res) => {

    req.body;
    let error = [];

    if (!req.body.companyId || !req.body.companyName) error.push('Company is required');
    if (!req.body.locationId || !req.body.locationAddress) error.push('Location is required');
    if (!req.body.message) error.push('Message is required');
    if (!req.body.receiver) error.push('Receiver is required');

    // Check the user

    let user;

    if (error.length === 0) {
        const objectId = new ObjectId(req.body.receiver);

        console.log(objectId)

        try {
            user = await req.app.db.collection('users').findOne({
                _id: objectId
            }, );
        } catch (err) {
            error.push('No such user')
        }
    }

    // Check if the company includes the user

    if (error.length === 0) {
        if (user && user.company && user.company == req.body.company.id) error.push('The account is already in the company!');

    }

    // Check if the user in an employee

    if (error.length === 0) {
        if (!user.isEmployee) error.push('The user is not an employee!');
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