'use strict';

const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {

    let error = [];

    if (!req.params.id) error.push('Id is required');

    let company;

    const objectId = new ObjectId(req.params.id);

    if (error.length === 0) {
        try {
            company = await req.app.db.collection('companies').findOne(
                {
                    _id: objectId
                },
                { projection: { name: 1 } }
            );
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            data: { ...company },
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}