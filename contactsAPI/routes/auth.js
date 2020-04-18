var express = require('express');
var router = express.Router();

// User controller
const userController = require('../controllers/userController');

// Validation
const validation = require('../validation');

// Passwording hashing and comparing
const hashing = require('../hashing');

const getUser = (req, res, next) => {
    userController.getUsersByEmail(req.body.email, users => {
        req.body.user = users[0];
        next();
    });
}

const authenticate = (req, res, next) => {
    const email = req.body.email;
    const candidatePassword = req.body.password;
    const hashedPassword = req.body.user.password;
    if (email == null || candidatePassword == null) res.sendStatus(400);
    hashing.comparePassword(candidatePassword, hashedPassword, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    });

}

router.post('/', validation(['email', 'password']), getUser, authenticate);

module.exports = router;
