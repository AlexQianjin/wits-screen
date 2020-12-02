const fs = require('fs');
const path = require('path');

const uploadImage = async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "image") to retrieve the uploaded file
            let image = req.files.image;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            image.mv('./public/' + image.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: image.name,
                    mimetype: image.mimetype,
                    size: image.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = { uploadImage };