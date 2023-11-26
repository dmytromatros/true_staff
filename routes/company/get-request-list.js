'use strict';

module.exports = async(req, res) => {
    let error = '';

    if (!req.params.id) {
        error = 'Company Id is required';
    }

    let receiveRequests;

    if (!error) {
        try {
            receiveRequests = await req.app.db.collection('requests').find({
                companyId: req.params.id,
                type: 2,
                companyDeleted: false,
            }).toArray();
        } catch (err) {
            error = err.message; // Use the error message for simplicity
        }
    }

    let sentRequests;

    if (!error) {
        try {
            sentRequests = await req.app.db.collection('requests').find({
                companyId: req.params.id,
                type: 1,
                companyDeleted: false
            }).toArray();
        } catch (err) {
            error = err.message;
        }
    }

    let data = {
        receive: receiveRequests,
        sent: sentRequests
    };

    if (!error) {
        res.status(200).json({
            data: data,
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}