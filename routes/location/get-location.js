'use strict';

const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {

    let error = [];

    if (!req.params.locationId) error.push('Location Id is required');

    let location;

    const objectId = new ObjectId(req.params.locationId);

    if (error.length === 0) {
        try {
            location = await req.app.db.collection('locations').findOne(
                {
                    _id: objectId
                },
                { projection: { adress: 1, image: 1 } }
            );
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            data: { ...location },
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}