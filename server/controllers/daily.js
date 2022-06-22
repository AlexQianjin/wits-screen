const { getConfiguration } = require('../utils');

const configurationPath = 'data.json';

const getDaily = async (req, res) => {
    const data = await getConfiguration(configurationPath);
    console.log(data);
    const { daily } = data;
    res.send(daily);
};

module.exports = { getDaily };
