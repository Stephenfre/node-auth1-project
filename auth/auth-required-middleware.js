const users = require('../users/users-model.js')
const bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {
    const { username, password } = req.headers;
    users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                next()
            } else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Wrong Credentials', err })
        })
};