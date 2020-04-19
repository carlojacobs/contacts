var express = require('express');
var router = express.Router();

// Employment controller
const educationController = require('../controllers/educationController');

// Validation
const validation = require('../validation');

// GET A USER'S EMPLOYMENT HISTORY

router.get('/:id', (req, res, next) => {
    educationController.getEducationHistory(req.params.id, eduHistory => {
        res.send(eduHistory);
    });
});

// ADD EMPLOYMENTS TO HISTORY
const addEmploymentsValidation = ['id', 'educations'];
router.post('/add', validation(addEmploymentsValidation), (req, res, next) => {
    const { id, educations } = req.body;
    educationController.addEducations(id, educations, result => {
        res.send(result);
    });
});

module.exports = router;
