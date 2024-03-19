'use strict';

const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {

    let error = [];

    if (!req.body.id) error.push('Id is required');
    if (!req.body.review) error.push('Відгук має містити хоча б щось...');


    const objectId = new ObjectId(req.body.id);

    let updateData = {};

    if (error.length === 0) {
        if (req.body.review) updateData.review = req.body.review;
    }

    let result;

    if (error.length === 0) {
        try {
            result = await req.app.db.collection('reviews').updateOne({ _id: objectId }, { $set: updateData });
        } catch (err) {
            error.push(err);
        }
    }

    if (error.length === 0) {
        res.status(200).json({
            message: 'Відгук змінено',
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}