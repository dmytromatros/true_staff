'use strict';

const { ObjectId } = require('mongodb');
module.exports = async (req, res) => {

    let error = [];

    if (req.params.id == '' || req.params.id == undefined) error.push('Location id is required');

    const objectId = new ObjectId(req.params.id);

    let workplaces;
    let isImage;

    if (error.length === 0) {
        try {
            isImage = await req.app.db.collection('locations').findOne({
                _id: objectId,
            }, { projection: { image: 1 } });
        } catch (err) {
            error.push(err);
        }
    }

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
            await req.app.db.collection('locations').deleteOne({
                _id: objectId,
            })
        } catch (err) {
            error.push(err)
        }

    } else {
        error.push('Є працівники на локації, спочатку видаліть працівників з локації');
    }

    if (error.length === 0 && isImage) {
        try {
            await req.app.db.collection('images').deleteOne({
                userId: req.params.id,
            })
        } catch (err) {
            error.push('Помилка видалення зображення.')
        }

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