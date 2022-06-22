const fs = require('fs');
const path = require('path');

function getConfiguration(configPath) {
    return new Promise((resolve, reject) => {
        if (!configPath) resolve({});
        fs.readFile(path.join(__dirname, '../public/') + configPath, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                reject(err);
            }
            try {
                resolve(JSON.parse(data));
            } catch (cerr) {
                reject(cerr);
            }
        });
    });
}

module.exports = { getConfiguration };
