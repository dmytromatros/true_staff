'use strict';

module.exports = async (req, res) => {

    try {

        await req.app.db.collection('users').insertOne(req.body.user);

        res.status(200).json({
            data: {},
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error,
            success: false
        });
    }
}