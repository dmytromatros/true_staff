'use strict';


module.exports = async(req, res) => {

    let error = [];

    if (!req.params.employeeId) error.push('Employee Id is required');

    let workplaces;


    if (error.length === 0) {
        try {
            workplaces = await req.app.db.collection('workplaces').find({
                employeeId: req.params.employeeId
            }).toArray();
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            data: {...workplaces },
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}