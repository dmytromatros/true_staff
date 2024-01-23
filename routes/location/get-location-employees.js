'use strict';
const { ObjectId } = require('mongodb');

module.exports = async(req, res) => {
    let error = [];
    let users = []; // Ініціалізація масиву users

    if (!req.params.id) error.push('Id is required');

    let workplaces;

    if (error.length === 0) {
        try {
            workplaces = await req.app.db.collection('workplaces').find({
                locationId: req.params.id,
                deleted: false
            }).toArray();
        } catch (err) {
            error.push(err);
        }
    }

    if (error.length === 0) {
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
        } catch (err) {
            error.push('lalal');
        }
    }

    if (error.length === 0) {
        res.status(200).json({
            data: users, // Виправлено тут
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
};