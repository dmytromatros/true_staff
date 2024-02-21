'use strict';

const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
    let errors = [];

    if (!req.params.id) {
        errors.push('Id is required');
    }

    let user;

    const objectId = new ObjectId(req.params.id);

    if (errors.length === 0) {
        try {
            // Використовуємо проекцію для виключення поля "password" та "email"
            user = await req.app.db.collection('users').findOne({ _id: objectId }, { projection: { password: 0, email: 0 } });

            if (!user) {
                errors.push('User not found');
            }
        } catch (err) {
            errors.push(err);
        }
    }

    if (errors.length === 0) {
        try {
            user.jobs = await req.app.db.collection('workplaces')
                .find({ employeeId: req.params.id })
                .toArray();
        } catch (err) {
            errors.push(err);
        }
    }

    if (errors.length === 0) {
        res.status(200).json({
            data: user,
            success: true
        });
    } else {
        res.status(417).json({
            errors: errors,
            success: false
        });
    }
};