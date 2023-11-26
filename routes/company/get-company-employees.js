'use strict';

const { ObjectId } = require('mongodb'); // Import ObjectId from MongoDB library

module.exports = async(req, res) => {
    let error = [];

    if (!req.params.id) error.push('Id is required');

    let employees;

    if (error.length === 0) {
        try {
            employees = await req.app.db.collection('workplaces').find({
                companyId: req.params.id,
                deleted: false
            }).toArray();
        } catch (err) {
            error.push(err);
        }
    }



    if (error.length === 0) {
        res.status(200).json({
            data: {...employees },
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
};