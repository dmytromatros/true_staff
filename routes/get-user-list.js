'use strict';

module.exports = async (req, res) => {
    console.log("lll")
    res.status(200).json({
        message: 'Hi there',
        data: { name: "ll", email: "ll@example.com" },
        success: true
    });
}
