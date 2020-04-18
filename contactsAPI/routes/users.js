var express = require('express');
var router = express.Router();

// Database connection
const con = require('../db') 

// Validation
const validation = require('../validation');

//Controllers
const userController = require('../controllers/userController');


router.get('/all', (req, res, next) => {
    userController.getAllUsers(users => {
        res.send(users);
    });
});

router.get('/user/:id', (req, res, next) => {
    userController.getUsersById(req.params.id, user => {
        res.send(user);
    });
});

// Check if there is already a user with this email
const checkForEmailDuplicate = (req, res, next) => {
    userController.getUsersByEmail(req.body.email, users => {
        if (users.length > 0) {
            res.sendStatus(400);
        } else {
            next();
        }
    })
}

const createUserValidation = ['firstname', 'lastname', 'email', 'biography', 'password'];
router.post('/create', validation(createUserValidation), checkForEmailDuplicate, (req, res, next) => {
    const user = req.body;
    userController.createUser(user, result => {
        res.send(result);
    });
});

const updateUserValidation = ['id', 'firstname', 'lastname', 'email', 'biography', 'password'];
router.put('/update', validation(updateUserValidation), (req, res, next) => {
    const newUser = req.body;
    userController.updateUser(newUser, result => {
        res.send(result);
    });
});

module.exports = router;
