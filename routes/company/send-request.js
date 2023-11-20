'use strict';

const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {

    req.body;
    let error = [];

    if (!req.body.company || !req.body.company.id || !req.body.company.name) error.push('Copmany is required');
    if (!req.body.location || !req.body.location.id || !req.body.location.adress) error.push('Location is required');
    if (!req.body.messege) error.push('Messege is required');
    if (!req.body.recivier) error.push('Recivier is required');

    // Check the user

    let user;

    if (error.length === 0) {
        const objectId = new ObjectId(req.body.recivier);

        console.log(objectId)

        try {
            user = await req.app.db.collection('users').findOne(
                {
                    _id: objectId
                },
            );
        } catch (err) {
            error.push('No such user')
        }
    }

    // Check if the company includes the user

    if (error.length === 0) {
        if (user?.company == req.body.company.id) error.push('The account is already in the company!');
    }

    // Check if the user in an employee

    if (error.length === 0) {
        if (!user.isEmployee) error.push('The user is not an employee!');
    }

    // Add new request

    if (error.length === 0) {
        try {
            await req.app.db.collection('requests').insertOne(req.body);
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