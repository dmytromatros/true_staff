'use strict';
const { ObjectId } = require('mongodb');

module.exports = async(req, res) => {
    let errors = [];
    let users = []; // Ініціалізація масиву користувачів

    if (!req.params.location) {
        errors.push('Location Id is required');
    }

    let workplaces;

    if (errors.length === 0) {
        try {
            workplaces = await req.app.db.collection('workplaces').find({
                locationId: req.params.location
            }).toArray();
        } catch (error) {
            errors.push(error);
        }
    }

    if (errors.length === 0) {
        try {
            await Promise.all(workplaces.map(async(place) => {
                const objectId = new ObjectId(place.employeeId);
                let user = await req.app.db.collection('users').findOne({
                    _id: objectId
                });

                if (user) {
                    users.push(user);
                }
            }));
        } catch (error) {
            errors.push(error);
        }
    }

    if (errors.length === 0) {
        res.status(200).json({
            data: users, // Змінено формат відповіді
            success: true
        });
    } else {
        res.status(404).json({
            errors: errors, // Змінено формат відповіді
            success: false
        });
    }
};