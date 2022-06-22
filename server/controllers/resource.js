const { getConfiguration } = require('../utils');

const getImages = async (req, res) => {
    const data = await getConfiguration(configurationPath);
    const {
        resource: { images }
    } = data;
    res.send(images);
};

const getVideos = async (req, res) => {
    const data = await getConfiguration(configurationPath);
    const {
        resource: { videos }
    } = data;
    res.send(videos);
};

const uploadImages = async (req, res) => {};

const uploadVideos = async (req, res) => {};

module.exports = { getImages, getVideos, uploadImages, uploadVideos };
