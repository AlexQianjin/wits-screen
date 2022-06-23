const { getConfiguration, setConfiguration } = require('../utils');

const configurationPath = 'data.json';

const getSettings = async (req, res) => {
    const data = await getConfiguration(configurationPath);
    const {
        global: { enable }
    } = data;
    console.log(enable);
    res.send({ enable });
};

const setSettings = async (req, res) => {
    const data = await getConfiguration(configurationPath);
    console.log(req.body);
    const { enable } = req.body;
    console.log(data);
    try {
        setConfiguration(configurationPath, { ...data, global: { ...data.global, enable } });
        res.send({
            status: 200
        });
    } catch (err) {
        res.send({
            status: 400,
            message: err
        });
    }
};

const getImages = async (req, res) => {
    const data = await getConfiguration(configurationPath);
    const {
        global: {
            resource: { images }
        }
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

module.exports = { getSettings, setSettings, getImages, getVideos, uploadImages, uploadVideos };
