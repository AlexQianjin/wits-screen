const fs = require('fs');
const path = require('path');

const videosFolderPath = path.join(__dirname, '../public/videos');

const isEnabled = async (req, res) => {
    try {
        res.send({
            status: 200,
            isEnabled: JSON.parse(fs.readFileSync(`${videosFolderPath}/setting.json`).toString()).enabled
        });
    } catch (err) {
        res.send({
            status: 200,
            isEnabled: false,
            error: err
        });
    }
};

const setEnabled = async (req, res) => {
    try {
        const {
            body: { enabled }
        } = req;
        let settings = JSON.parse(fs.readFileSync(`${videosFolderPath}/setting.json`).toString());
        settings.enabled = enabled === 'true';
        fs.writeFileSync(`${videosFolderPath}/setting.json`, JSON.stringify(settings));
        res.send({
            status: 200,
            isEnabled: JSON.parse(fs.readFileSync(`${videosFolderPath}/setting.json`).toString()).enabled
        });
    } catch (err) {
        res.send({
            status: 200,
            isEnabled: false,
            error: err
        });
    }
};

const getVideos = async (req, res) => {
    try {
        res.send({
            status: true,
            settings: fs.readFileSync(`${videosFolderPath}/setting.json`).toString(),
            videos: fs.readdirSync(videosFolderPath).filter(file => file !== 'setting.json'),
            error: undefined
        });
    } catch (err) {
        res.send({
            status: true,
            settings: {},
            videos: [],
            error: err
        });
    }
};

const uploadVideos = async (req, res) => {
    try {
        console.log(req.files);
        const {
            files: { videos },
            body: { settings }
        } = req;
        if (!videos) {
            res.send({
                status: false,
                message: 'No video upload'
            });
        } else {
            if (!fs.existsSync(videosFolderPath)) {
                fs.mkdirSync(videosFolderPath);
            }
            let errors = [];
            fs.writeFileSync(`${videosFolderPath}/setting.json`, settings);
            if (videos.length) {
                for (video of videos) {
                    const { name, data } = video;
                    fs.writeFile(`${videosFolderPath}/${name}`, data, err => {
                        if (err) {
                            errors.push(err);
                        }
                    });
                }
            } else {
                const { name, data } = videos;
                fs.writeFile(`${videosFolderPath}/${name}`, data, err => {
                    if (err) {
                        errors.push(err);
                    }
                });
            }

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                errors
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports = { getVideos, uploadVideos, isEnabled, setEnabled };
