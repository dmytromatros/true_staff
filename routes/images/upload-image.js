'use strict';
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
    let error = [];

    const file = req.file;
    const userId = req.body.userId;

    if (!file) error.push('File is required');
    if (!userId) error.push('User ID is required');

    let isImage;

    if (error.length === 0) {
        isImage = await req.app.db.collection('images').findOne({
            userId: userId,
        })

    }

    if (error.length === 0) {

        if (isImage == null) {
            try {
                await req.app.db.collection('images').insertOne({
                    userId: userId,
                    filename: file.originalname,
                    contentType: file.mimetype,
                    data: file.buffer,
                });

                const objectId = new ObjectId(userId);
                let updateData = { isImage: true };

                try {
                    await req.app.db.collection('companies').updateOne({ _id: objectId }, { $set: updateData });
                    await req.app.db.collection('users').updateOne({ _id: objectId }, { $set: updateData });
                    await req.app.db.collection('locations').updateOne({ _id: objectId }, { $set: updateData });
                } catch (err) {
                    error.push('Error updating company/user');
                }

            } catch (err) {
                error.push('Error inserting image data');
            }
        } else {
            let updateData = {
                filename: file.originalname,
                contentType: file.mimetype,
                data: file.buffer,
            }
            await req.app.db.collection('images').updateOne({
                userId: userId,
            }, { $set: updateData });
        }

    }

    if (error.length === 0) {
        res.status(200).json({
            success: true,
            message: 'Image uploaded and information saved successfully',
        });
    } else {
        res.status(417).json({
            success: false,
            message: error[0],
        });
    }
};