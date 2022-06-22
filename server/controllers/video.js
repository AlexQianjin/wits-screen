const { getConfiguration } = require('../utils');

const configurationPath = 'data.json';

const getVideo = async (req, res) => {
    const data = await getConfiguration(configurationPath);
    const { video } = data;
    res.send(video);
};

module.exports = { getVideo };
