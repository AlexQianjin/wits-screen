const parse = require('csv-parse')
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
              console.log(output);
            res
            .status(200)
            .json({result: output});
          });
    });
};

module.exports = { getEmployees };