'use strict';

module.exports = async(req, res) => {

    try {
        const userId = req.params.id;


        // Retrieve the image data from MongoDB based on employeeId
        const image = await req.app.db.collection('images').findOne({
            userId: userId,
        });

        if (image) {
            res.status(200).send({
                success: true,
                data: `data:${image.contentType};base64,${image.data.toString('base64')}`
            });
        } else {
            res.status(200).json({
                success: false,
                message: 'Image not found',
            });
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
}