'use strict';

const { ObjectId } = require('mongodb');
module.exports = async (req, res) => {

    let error = [];

    if (req.params.id == '' || req.params.id == undefined) error.push('Location id is required');

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

    if (error.length === 0 && !workplaces.length) {
        try {
            const objectId = new ObjectId(req.params.id);
            await req.app.db.collection('locations').deleteOne({
                _id: objectId,
            })
        } catch (err) {
            error.push(err)
        }

    } else {
        error.push('Є працівники на локації, спочатку видаліть працівників з локації');
    }

    if (error.length === 0) {
        res.status(200).json({
            message: 'Локація видалена',
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}