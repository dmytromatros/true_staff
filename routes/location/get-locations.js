'use strict';

module.exports = async (req, res) => {
    let error = [];

    if (!req.params.companyId) error.push('Company Id is required');

    let locations;

    if (error.length === 0) {
        try {
            locations = await req.app.db.collection('locations').find({ company: req.params.companyId }).toArray();
        } catch (err) {
            error.push(err);
        }
    }

    if (error.length === 0) {
        for (const location of locations) {
            try {
                let workplaces = await req.app.db.collection('workplaces').find({
                    locationId: location._id.toString(),
                    deleted: false
                }, {
                    projection: {
                        _id: 1
                    }
                }).toArray();

                location.employeesCount = workplaces.length;
            } catch (err) {
                error.push(err);
            }
        }
    }

    if (error.length === 0) {
        res.status(200).json({
            data: locations,
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
};
