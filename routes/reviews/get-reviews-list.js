'use strict';

module.exports = async(req, res) => {

    let error = [];

    if (!req.params.id) error.push('Id is required!')

    let reviewsList;

    if (error.length === 0) {
        try {
            reviewsList = await req.app.db.collection('reviews').find({
                to: req.params.id
            }).toArray();
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            message: 'Review has been sent!',
            data: {...reviewsList },
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}