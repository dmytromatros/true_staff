'use strict';

module.exports = async (req, res) => {
    let error = [];
    let users;

    if (!req.body.name && !req.body.lname) error.push('Name or Surname required!!!')

    if (error.length === 0) {
        try {
            const nameRegex = req.body.name ? new RegExp(req.body.name, 'i') : null; // Case-insensitive regex for name
            const surnameRegex = req.body.lname ? new RegExp(req.body.lname, 'i') : null; // Case-insensitive regex for surname

            const query = {};

            if (nameRegex) {
                if (surnameRegex) {
                    query.$or = query.$or || [];
                    query.$or.push({ surname: { $regex: surnameRegex }, name: { $regex: nameRegex } });
                } else {

                    query.$or = [{ name: { $regex: nameRegex } }];
                }
            }

            if (surnameRegex) {
                query.$or = query.$or || [];
                query.$or.push({ surname: { $regex: surnameRegex } });
            }


            users = await req.app.db.collection('users').find(query, { projection: { name: 1, surname: 1, isImage: 1 } }).toArray();
        } catch (err) {
            error.push(err);
        }
    }


    if (error.length === 0) {
        res.status(200).json({
            data: users,
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}
