var express = require('express');
var router = express.Router();

var employeesController = require('../controllers/employees');

/* GET employees listing. */
router.get('/getAll', employeesController.getAllEmployees);

router.get('/', employeesController.getEmployees);

router.post('/', employeesController.saveAsCSV);

module.exports = router;