var express = require('express');
var router = express.Router();

var employeesController = require('../controllers/employees');

/* GET employees listing. */
router.get('/', employeesController.getEmployees);

module.exports = router;