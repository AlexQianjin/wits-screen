const { getConfiguration } = require('../utils');

const configurationPath = 'data.json';

const getSwiper = async (req, res) => {
    const data = await getConfiguration(configurationPath);
    const { swiper } = data;
    res.send(swiper);
};

module.exports = { getSwiper };
