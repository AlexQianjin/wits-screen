const parse = require('csv-parse');
const stringify = require('csv-stringify');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const getAllEmployees = (req, res) => {
    const filePath = path.join(__dirname, '../employees.csv');
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            res.status(400).json({ message: 'read csv file failed' });
        }
        parse(data, (err, output) => {
            if (err) {
                res.status(400).json({ message: 'parse csv file failed' });
            }
            res.status(200).json({ result: output });
        });
    });
};

const getEmployees = (req, res) => {
    const filePath = path.join(__dirname, '../employees.csv');
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            res.status(400).json({ message: 'read csv file failed' });
        }
        parse(data, (err, output) => {
            if (err) {
                res.status(400).json({ message: 'parse csv file failed' });
            }
            let birthdayEmployees = output.filter(arr => {
                let birthday = new Date(arr[4]);
                let today = new Date();
                return birthday.getDate() === today.getDate() && birthday.getMonth() === today.getMonth();
            });
            console.log(birthdayEmployees);
            res.status(200).json({ result: birthdayEmployees });
        });
    });
};

const saveAsCSV = (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "excel") to retrieve the uploaded file
            let excel = req.files.excel;
            let workbook = XLSX.read(excel.data, { type: 'buffer' });

            let first_sheet_name = workbook.SheetNames[0];
            let worksheet = workbook.Sheets[first_sheet_name];
            let i = 1;
            let rows = [];
            while (worksheet[`A${i}`]) {
                let row = [];
                let columns = ['A', 'B', 'C', 'D', 'E', 'F'];
                columns.forEach(v => {
                    let cell = worksheet[`${v}${i}`];
                    if (cell) {
                        console.log(`${v}${i}: ` + cell.w);
                        row.push(cell.w);
                    }
                });
                if (row.length === columns.length) {
                    rows.push(row);
                }
                i += 1;
            }

            console.log('Total rows: ' + rows.length);

            stringify(rows, (err, output) => {
                if (err) {
                    res.send({
                        status: false,
                        message: 'csv to string failed!'
                    });
                }

                fs.writeFile('./employees.csv', output, err => {
                    if (err) {
                        res.send({
                            status: false,
                            message: 'csv save failed!'
                        });
                    }

                    //send response
                    res.send({
                        status: true,
                        message: 'File is uploaded',
                        data: {
                            name: excel.name,
                            mimetype: excel.mimetype,
                            size: excel.size
                        }
                    });
                });
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = { getAllEmployees, getEmployees, saveAsCSV };

