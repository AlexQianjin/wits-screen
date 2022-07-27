const fs = require('fs');
const path = require('path');

const videosFolderPath = path.join(__dirname, '../public/videos');

const getVideos = async (req, res) => {
    try {
        res.send({
            status: true,
            settings: fs.readFileSync(`${videosFolderPath}/setting.json`),
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
        console.log(req.body);
        const { settings } = req.body;
        if (!files) {
            res.send({
                status: false,
                message: 'No video upload',
                dd: req.body
            });
        } else {
            if (!fs.existsSync(videosFolderPath)) {
                fs.mkdirSync(videosFolderPath);
            }
            let errors = [];
            fs.writeFileSync(`${videosFolderPath}/setting.json`, settings);
            for (file of files) {
                const { name, bin } = file;
                fs.writeFile(`${videosFolderPath}/${name}`, bin, err => {
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

module.exports = { getVideos, uploadVideos };
