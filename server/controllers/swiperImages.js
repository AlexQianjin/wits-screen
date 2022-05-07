const fs = require('fs');
const path = require('path');
const URL = './public/swiperImages/';
const oString = Object.prototype.toString;

const isArray = target => { return oString(target) === '[object Array]' };


const getSwiperImages = async (req, res) => {
  fs.readFileSync(URL);
  res.send({
    staus: true,
    data: {
      msg: 'OK'
    }
  })
}


//cache image to local URL(piblic/swiperImages/)
const writeInPic = (file) => {
  fs.writeFile(URL + file.name, file.data, 'base64', (err) => {
    console.log(err);
  })
}

// empty dir
const emptyDir = () => {
  const folder = fs.readdirSync(URL);
  folder.forEach(el => {
    const filePath = `${URL}/${el}`;
    fs.unlinkSync(filePath);
  })
  console.log(folder);
}

const uploadImage = async (req, res) => {
  // console.log(req.files.image);

  try {
    if (!req.files.image) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      const images = req.files.image;
      emptyDir();
      if (!isArray(images)) {
        writeInPic(images);
      } else {
        // Use the Func writeInPic cache images to local
        images.forEach(el => {
          writeInPic(el);
        })
      }

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: !isArray(images) ? images.name : images.map(el => el.name),
          mimetype: !isArray(images) ? images.mimetype : images.map(el => el.mimetype),
          size: !isArray(images) ? images.size : images.map(el => el.size)
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { uploadImage, getSwiperImages };