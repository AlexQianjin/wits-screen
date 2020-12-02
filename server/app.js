const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const employeesRouter = require('./routes/employees');
const imagesRouter = require('./routes/images');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/images', imagesRouter);

app.route('*')
    .get(
    (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });

module.exports = app;
