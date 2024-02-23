'use strict';
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
    try {
        const file = req.file;
        const userId = req.body.userId;

        if (!file) throw new Error('File is required');
        if (!userId) throw new Error('User ID is required');

        const isImage = await req.app.db.collection('images').findOne({
            userId: userId,
        });

        if (isImage == null) {
            await req.app.db.collection('images').insertOne({
                userId: userId,
                filename: file.originalname,
                contentType: file.mimetype,
                data: file.buffer,
            });

            const objectId = new ObjectId(userId);
            const updateData = { isImage: true };

            await Promise.all([
                req.app.db.collection('companies').updateOne({ _id: objectId }, { $set: updateData }),
                req.app.db.collection('users').updateOne({ _id: objectId }, { $set: updateData }),
                req.app.db.collection('locations').updateOne({ _id: objectId }, { $set: updateData }),
            ]);
        } else {
            const updateData = {
                filename: file.originalname,
                contentType: file.mimetype,
                data: file.buffer,
            };

            await req.app.db.collection('images').updateOne({
                userId: userId,
            }, { $set: updateData });
        }

        res.status(200).json({
            success: true,
            message: 'Image uploaded and information saved successfully',
        });
    } catch (err) {
        res.status(417).json({
            success: false,
            message: err.message,
        });
    }
};
