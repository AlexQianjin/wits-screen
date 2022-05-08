const fs = require('fs');
const path = require('path');
const DIR_URL = '../public/swiperImages/';
const PUB_URL = '../public/';
const oString = Object.prototype.toString;

let SWIPER_TIME = 3000;
let IS_SWIPER_PIC = true;

const isArray = target => { return oString(target) === '[object Array]' };

const mixin = (target, oObj) => {
  for (let key in oObj) {
    if (!target[key]) {
      target[key] = oObj[key];
    }
  }
  console.log("target:", target);
  return target;
}


/* 
 * read status.txt info .
 * @returns obj
 */
const readTxt = () => {
  const filePath = path.join(__dirname, PUB_URL);
  let txt = fs.readFileSync(filePath + 'status.txt', {encoding: "utf-8"});
  let obj = {}
  txt.split(';').forEach(el => {
    let tmpList = el.split('=');
    obj[tmpList[0]] = tmpList[1];
  });
  return obj;
}

// write status info into status.txt .
const writeTxt = (options) => {
  const filePath = path.join(__dirname, PUB_URL);
  let oObj = readTxt();
  options = mixin(options, oObj);
  let list = [];
  for (let key in options) {
    list.push(`${key}=${options[key]}`);
  }
  let str = list.join(';');
  console.log("write msg :", str);
  fs.writeFile(filePath + 'status.txt', str, 'utf-8', (err, data) => {
    if (err) {
      return false;
    } else {
      console.log("write success!", data);
      return true;
    }
  })
}

// get params 'isopen' to decide openning swiper function
const getShowSwiper = async (req, res) => {
  const filePath = path.join(__dirname, PUB_URL);

  let txt = readTxt();
  console.log("sync txt", txt);

  res.send({
    status: 200,
    isopen: txt['IS_SWIPER_PIC'] === "true" ? true : false
  })
}

// get swiper images and time info
const getSwiperImages = async (req, res) => {
  const filePath = path.join(__dirname, DIR_URL);
  let list = []
  fs.readdir(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      list = data.map(el => 
        {
          console.log(filePath + el);
          return fs.readFileSync(filePath + el, {encoding: 'base64'})
        }
      );
      
      //get txt info
      let txt = readTxt();

      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          file: list,
          setting_time: Number(txt.SWIPER_TIME),
          is_swiper: txt.IS_SWIPER_PIC
        },
      })
    }
  });
}

//cache image to local URL(piblic/swiperImages/)
const writeInPic = (file) => {
  const filePath = path.join(__dirname, DIR_URL);
  fs.writeFile(filePath + file.name, file.data, {encoding: 'base64'}, (err) => {
    console.log(err);
  })
}

// empty dir
const emptyDir = () => {
  const filePath = path.join(__dirname, DIR_URL);
  const folder = fs.readdirSync(filePath);
  folder.forEach(el => {
    const fileUrl = `${filePath}/${el}`;
    fs.unlinkSync(fileUrl);
  })
}

const uploadImage = async (req, res) => {
  try {
    if (!req.files.image) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      let images = req.files.image;
      writeTxt(
        {
          SWIPER_TIME:req.body.swiperTime,
          IS_SWIPER_PIC:req.body.isopen
      });
      console.log(req.body.swiperTime, req.body.isopen);
      emptyDir();
      if (!images.length) {
        writeInPic(images);
      } else {
        // Use the Func writeInPic cache images to local
        for (let i = 0 ; i < images.length; i ++) {
          let el = images[i];
          writeInPic(el);
        }
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

module.exports = { uploadImage, getSwiperImages, getShowSwiper };