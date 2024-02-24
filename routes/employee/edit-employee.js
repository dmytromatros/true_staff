'use strict';

module.exports = async (req, res) => {

    let error = [];

    if (!req.body.employeeId) error.push('Employee id is required');
    if (!req.body.companyId) error.push('Company id is required');


    let updateData = {};

    if (error.length === 0) {
        if (req.body.locationAddress) updateData.locationAddress = req.body.locationAddress;
        if (req.body.locationId) updateData.locationId = req.body.locationId;
        if (req.body.position) updateData.position = req.body.position;
    }

    let result;

    if (error.length === 0) {
        try {
            result = await req.app.db.collection('workplaces').updateOne({
                companyId: req.body.companyId,
                employeeId: req.body.employeeId,
                deleted: false,
            }, { $set: updateData });
        } catch (err) {
            error.push('Не вийшло оновити дані. Спробуйте ще раз');
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            message: 'Інформацію оновлено',
            data: result,
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}