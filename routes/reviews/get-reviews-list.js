'use strict';

module.exports = async (req, res) => {

    let error = [];

    if (!req.params.id) error.push('Id is required!')

    let reviewsList;

    if (error.length === 0) {
        try {
            reviewsList = await req.app.db.collection('reviews').find({
                to: req.params.id
            }).toArray();
            reviewsList.sort((a, b) => b.date - a.date);
        } catch (err) {
            error.push(err);
        }
    }

    let averageStars = 0

    if (error.length === 0) {
        if (reviewsList && reviewsList.length > 0) {
            const validReviews = reviewsList.filter(review => review.reviewStars);
            const sum = validReviews.reduce((acc, review) => acc + review.reviewStars, 0);
            const allReviews = validReviews.length;
            averageStars = sum / allReviews;
        }
    }

    if (error.length === 0) {
        res.status(200).json({
            message: 'Review has been sent!',
            data: { ...reviewsList },
            rate: averageStars,
            success: true
        });
    } else {
        res.status(417).json({
            message: error,
            success: false
        });
    }
}