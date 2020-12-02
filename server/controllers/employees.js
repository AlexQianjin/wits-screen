const parse = require('csv-parse');
const fs = require('fs');
const path = require('path');

const getEmployees = (req, res) => {
    const filePath = path.join(__dirname, '../employees.csv');
    fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
        if(err) {
            res.status(400).json({message: 'read csv file failed'});
        }
        parse(data, (err, output) => {
            if(err) {
                res.status(400).json({message: 'parse csv file failed'});
            }
            let birthdayEmployees = output.filter(arr => {
                let birthday = new Date(arr[4]);
                let today = new Date();
                return birthday.getDate() === today.getDate() && birthday.getMonth() === today.getMonth();
            });
            console.log(birthdayEmployees);
            res
            .status(200)
            .json({result: birthdayEmployees});
          });
    });
};

module.exports = { getEmployees };