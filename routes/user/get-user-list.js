'use strict';

module.exports = async (req, res) => {


    let users;

    try {
        users = await req.app.db.collection('users').find({}).toArray()

        res.status(200).json({
            data: { ...users },
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error,
            success: false
        });
    }


}
