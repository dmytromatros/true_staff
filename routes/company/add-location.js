'use strict';

module.exports = async (req, res) => {

    const { company, adress } = req.body;
    let error = [];

    if (company == '' || company == undefined) error.push('Company id is required');
    if (adress == '' || adress == undefined) error.push('Adress is required');

    let adressCheck;

    if (error.length === 0) {
        try {

            adressCheck = await req.app.db.collection('locations').findOne({ adress });
            if (adressCheck) error.push('The location with such an adress is already registered');

        } catch (err) {
            error.push(err);
        }
    }

    if (error.length === 0) {
        try {
            await req.app.db.collection('locations').insertOne(req.body);
        } catch (err) {
            error.push(err);
        }
    }

    let locations;

    if (error.length === 0) {
        try {
            locations = await req.app.db.collection('locations').find({ company: req.body.company }).toArray()
        }
        catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            message: 'New location was successfully added',
            data: { ...locations },
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}