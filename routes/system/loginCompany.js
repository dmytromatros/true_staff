'use strict';

module.exports = async (req, res) => {

    const { login, password } = req.body

    console.log(login, password)
}