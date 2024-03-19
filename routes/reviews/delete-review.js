'use strict';

const { ObjectId } = require('mongodb');
module.exports = async (req, res) => {

    let error = [];

    if (req.params.id == '' || req.params.id == undefined) error.push('Review id is required');

    const objectId = new ObjectId(req.params.id);


    if (error.length === 0) {
        try {
            await req.app.db.collection('reviews').deleteOne({
                _id: objectId,
            })
        } catch (err) {
            error.push(err)
        }
    }

    if (error.length === 0) {
        res.status(200).json({
            message: 'Відгук видалено',
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}