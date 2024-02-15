'use strict';

const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {

    let error = [];

    if (!req.body.id) error.push('Company id id is required');
    if (!req.body.employeeId) error.push('Employee id is required');


    if (error.length === 0) {

        try {
            await req.app.db.collection('workplaces').updateOne({ companyId: req.body.id, employeeId: req.body.employeeId, deleted: false }, { $set: { deleted: true } });
        } catch (err) {
            error.push(err);
        }

    }



    if (error.length === 0) {

        try {
            await req.app.db.collection('requests').deleteMany({ companyId: req.body.id, employeeId: req.body.employeeId }, { $set: { deleted: true } });
        } catch (err) {
            error.push(err);
        }

    }



    if (error.length === 0) {
        res.status(200).json({
            message: 'Employee has been deleted',
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}