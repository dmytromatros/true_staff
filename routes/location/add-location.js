'use strict';

module.exports = async(req, res) => {

    const { company, address } = req.body;
    let error = [];

    if (company == '' || company == undefined) error.push('Company id is required');
    if (address == '' || address == undefined) error.push('Address is required');

    let addressCheck;

    if (error.length === 0) {
        try {

            addressCheck = await req.app.db.collection('locations').findOne({ address, company });
            if (addressCheck) error.push('The location with such an address is already registered');

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
        } catch (err) {
            error.push(err);
        }
    }

    let currentLocation;
    if (error.length === 0) {
        try {
            currentLocation = await req.app.db.collection('locations').findOne({ company: req.body.company, address: req.body.address })
        } catch (err) {
            error.push('lll');
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            message: 'New location was successfully added',
            data: {...locations, new: {...currentLocation } },
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}