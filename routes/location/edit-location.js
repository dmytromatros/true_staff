'use strict';

const { ObjectId } = require('mongodb');

module.exports = async(req, res) => {

    let error = [];

    if (!req.body.id) error.push('Id is required');
    if (!req.body.companyId) error.push('Company id is required');
    3

    let locations;

    const objectId = new ObjectId(req.body.id);

    let updateData = {};

    if (error.length === 0) {
        if (req.body.address) updateData.address = req.body.address;
        if (req.body.image) updateData.image = req.body.image;
    }

    let result;

    if (error.length === 0) {
        try {
            result = await req.app.db.collection('locations').updateOne({ _id: objectId }, { $set: updateData });
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        try {
            locations = await req.app.db.collection('locations').find({ company: req.body.companyId }).toArray()
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            data: {...locations },
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}