var express = require('express');
var router = express.Router();

// Employment controller
const employmentController = require('../controllers/employmentController');

// Validation
const validation = require('../validation');

// GET A USER'S EMPLOYMENT HISTORY

router.get('/:id', (req, res, next) => {
    employmentController.getEmploymentHistory(req.params.id, empHistory => {
        res.send(empHistory);
    });
});

// ADD EMPLOYMENTS TO HISTORY
const addEmploymentsValidation = ['id', 'employments'];
router.post('/add', validation(addEmploymentsValidation), (req, res, next) => {
    const { id, employments } = req.body;
    employmentController.addEmployments(id, employments, result => {
        res.send(result);
    });
});

module.exports = router;
