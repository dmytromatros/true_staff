'use strict';

module.exports = async(req, res) => {

    let error = [];

    let companies;

    if (error.length === 0) {
        try {
            companies = await req.app.db.collection('companies').find({}).toArray();
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            data: {...companies },
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}