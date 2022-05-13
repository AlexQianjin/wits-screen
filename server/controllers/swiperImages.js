const fs = require('fs');
const path = require('path');
const DIR_URL = '../public/swiperImages/';
const PUB_URL = '../public/';
const oString = Object.prototype.toString;

const isArray = target => { return oString(target) === '[object Array]' };

// mixin two objects
// return target object
const mixin = (target, oObj) => {
  for (let key in oObj) {
    if (!target[key]) {
      target[key] = oObj[key];
    }
  }
  return target;
}

// format json to txt string .
const formatJSON = (options) => {
  let list = [];
  for (let key in options) {
    list.push(`${key}=${options[key]}`);
  }
  return list.join(';');
}

// format status.txt string to json .
const formatTXTString = (str) => {
  let obj = {};
  str.split(';').forEach(el => {
    let tmpList = el.split('=');
    obj[tmpList[0]] = tmpList[1];
  });
  return obj;
}

/* 
 * read status.txt info .
 * @returns obj
 */
const readTxt = () => {
  const filePath = path.join(__dirname, PUB_URL);
  let obj = {};
  try {
    let txt = fs.readFileSync(filePath + 'status.txt', { encoding: "utf-8" });
    obj = formatTXTString(txt);
    return obj;
  } catch (err) {
    console.log(`read '${filePath}status.txt' failed, and create new status`);
    obj = {
      SWIPER_TIME: 5000,
      IS_SWIPER_PIC: false
    };
    fs.writeFile(filePath + 'status.txt', formatJSON(obj), { encoding: 'utf-8' }, (err) => {
      console.log(`create '${filePath}status.txt' failed`);
    });
    return obj;
  }
}

// write status info into status.txt .
const writeTxt = (options) => {
  const filePath = path.join(__dirname, PUB_URL);
  let oObj = readTxt();
  options = mixin(options, oObj);

  let str = formatJSON(options);
  fs.writeFile(filePath + 'status.txt', str, 'utf-8', (err) => {
    if (err) {
      console.log("write failed!");
      return false;
    } else {
      console.log("write success!");
      return true;
    }
  })
}

// get params 'isopen' to decide openning swiper function
const getShowSwiper = async (req, res) => {
  let txt = readTxt();

  res.send({
    status: 200,
    isopen: txt['IS_SWIPER_PIC'] === "true" ? true : false
  })
}

// get params 'isopen' to decide openning swiper function
const getRollPicType = async (req, res) => {
  let txt = readTxt();
  console.log(txt);
  res.send(JSON.stringify({
    status: 200,
    rollpictype: txt.ROLL_PIC_TYPE
  }))
}

// response swiper images and time info
const getSwiperImages = async (req, res) => {
  const filePath = path.join(__dirname, DIR_URL);
  let list = []

  fs.readdir(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      fs.mkdir(filePath, (err) => {
        if (err) {
          console.log(`create images folder failed!`);
          let txt = readTxt();
          res.send({
            status: 500,
            msg: err,
            data: {
              file: [],
              setting_time: Number(txt.SWIPER_TIME),
              is_swiper: txt.IS_SWIPER_PIC,
              roll_pic_type: txt.ROLL_PIC_TYPE
            }
          })
        } else {
          data?.sort((a, b) => {
            let x = a.split('.')[0], y = b.split('.')[0];
            return Number(reg.exec(x)) - Number(reg.exec(y));
          })
          list = data?.map(el => {
            return fs.readFileSync(filePath + el, { encoding: 'base64' })
          });

          //get txt info
          let txt = readTxt();

          res.send({
            status: true,
            message: 'File is uploaded',
            data: {
              file: list,
              setting_time: Number(txt.SWIPER_TIME),
              is_swiper: txt.IS_SWIPER_PIC,
              roll_pic_type: txt.ROLL_PIC_TYPE
            },
          })
        }
      })
    } else {
      const reg = /[0-9]*$/g;
      data.sort((a, b) => {
        let x = a.split('.')[0], y = b.split('.')[0];
        return Number(reg.exec(x)) - Number(reg.exec(y));
      })
      list = data.map(el => {
        return fs.readFileSync(filePath + el, { encoding: 'base64' })
      });

      //get txt info
      let txt = readTxt();

      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          file: list,
          setting_time: Number(txt.SWIPER_TIME),
          is_swiper: txt.IS_SWIPER_PIC,
          roll_pic_type: txt.ROLL_PIC_TYPE
        },
      })
    }
  });
}



//cache image to local URL(piblic/swiperImages/)
const writeInPic = (files) => {
  const filePath = path.join(__dirname, DIR_URL);

  if (!files.length) {
    fs.readdir(filePath, (err) => {
      if (!err) {
        fs.writeFile(filePath + files.name, files.data, { encoding: 'base64' }, (err) => {
          console.log(err);
        })
      } else {
        fs.mkdir(filePath, (err) => {
          if (!err) {
            fs.writeFile(filePath + files.name, files.data, { encoding: 'base64' }, (err) => {
              console.log(err);
            })
          }
        })
      }
    })
  } else {
    fs.readdir(filePath, (err) => {
      if (!err) {
        for (let i = 0; i < files.length; i++) {
          let el = files[i];
          fs.writeFile(filePath + el.name, el.data, { encoding: 'base64' }, (err) => {
            console.log(err);
          })
        }
      } else {
        fs.mkdir(filePath, (err) => {
          if (!err) {
            for (let i = 0; i < files.length; i++) {
              let el = files[i];
              fs.writeFile(filePath + el.name, el.data, { encoding: 'base64' }, (err) => {
                console.log(err);
              })
            }
          }
        })
      }
    })
  }
}

// empty dir
const emptyDir = () => {
  const filePath = path.join(__dirname, DIR_URL);
  try {
    const folder = fs.readdirSync(filePath);
    folder.forEach(el => {
      const fileUrl = `${filePath}/${el}`;
      fs.unlinkSync(fileUrl);
    })
  } catch (err) {
    console.log(err);
    return null;
  }
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
          SWIPER_TIME: req.body.swiperTime,
          IS_SWIPER_PIC: req.body.isopen,
          ROLL_PIC_TYPE: req.body.rollPicType
        });
      console.log(req.body.swiperTime, req.body.isopen);
      emptyDir();

      // Use the Func writeInPic cache images to local
      writeInPic(images);

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

module.exports = { uploadImage, getSwiperImages, getShowSwiper, getRollPicType };