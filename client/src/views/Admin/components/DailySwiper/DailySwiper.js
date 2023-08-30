import React, { useState, useEffect } from 'react';
import { Button, Typography, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700,
    color: '#000',
    marginTop: '16px'
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  },
  btn: {
    backgroundColor: '#eee'
  },
  imgList: {
    color: '#333'
  },
  img: {
    width: '130px'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  subtitle: {
    fontWeight: '700',
    color: '#000'
  }
}));

const DailySwiper = props => {
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [nameList, setNameList] = useState([]);
  let [uploadTime, setUploadTime] = useState(3);
  const [isOpen, setOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [scrollType, setScrollType] = useState("horizontal");
  const { className, ...rest } = props;

  const classes = useStyles();

  useEffect(() => {
    fetch('/api/swiperImages/getSwiperConfig')
      .then(response => response.json())
      .then(res => {
        console.log(res);
        const { settingTime, isSwiper, scrollType } = res.data;
        setUploadTime(settingTime / 1000);
        setOpen(isSwiper);
        setScrollType(scrollType || 'horizontal');
        setLoading(false);
      }).catch(err => {
        console.log('An error has occurred on swiper config ', err);
        setLoading(false);
      });
    return () => { }
  }, [])

  const changeTime = e => {
    uploadTime = Number(e.target.value.trim());
    setUploadTime(uploadTime);
  }

  const refreshList = list => {
    return [].filter.call(list, el => el !== null && el !== '')
  }

  const addFile = e => {
    e.preventDefault();

    let files = e.target.files;

    for (let key in files) {
      if (files[key] instanceof File) {
        list.push(files[key]);
        nameList.push(files[key].name);
      }
    }
    setList(refreshList(list));
    setNameList(refreshList(nameList));
  }

  const remove = (e, idx) => {
    list.splice(idx, 1);
    nameList.splice(idx, 1);
    setList(refreshList(list));
    setNameList(refreshList(nameList));
  }

  const submit = e => {
    e.preventDefault();

    const formData = new FormData();

    list.forEach(el => {
      formData.append('image', el);
    })

    formData.append('swiperTime', uploadTime * 1000);
    formData.append('isopen', isOpen);
    formData.append('scrollType', scrollType);

    fetch('/api/swiperImages', { method: 'POST', body: formData })
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          setUploadStatus('Update Successfully!');
        } else {
          setUploadStatus('Update Failed!');
        }
      })
      .catch(err => {
        console.log(err);
        setUploadStatus('Update Failed!');
      });
  }

  const onScrollTypeChange = e => {
    console.log(e);
    setScrollType(e.target.value);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        className={classes.title}
        gutterBottom
        variant="h3"
      >
        更新滚动图片
      </Typography>
      <form
        id="upload-swiper-images-form"
        onSubmit={submit}
        method="post"
      >
        <label>
          <p
            className={clsx(classes.subtitle, className)}
          >滚动时间间隔（秒）:</p>
          <input
            onChange={changeTime}
            value={uploadTime}
          />
        </label>
        <label>
          <p
            className={clsx(classes.subtitle, className)}
          >是否开启滚动图片:</p>
          <span
            className={clsx(classes.imgList, className)}
          >是：</span>
          <input
            type="radio"
            name="open"
            value="true"
            checked={isOpen}
            onChange={() => { setOpen(true) }}
          />
          <span
            className={clsx(classes.imgList, className)}
          >否：</span>
          <input
            type="radio"
            name="open"
            value="false"
            checked={!isOpen}
            onChange={() => { setOpen(false) }}
          />
        </label>
        <label>
          <p
            className={clsx(classes.subtitle, className)}
          >滚动方式:</p>
          <span
            className={clsx(classes.imgList, className)}
          >水平：</span>
          <input
            type="radio"
            name="scrollType"
            value="horizontal"
            checked={scrollType === 'horizontal'}
            onChange={onScrollTypeChange}
          />
          <span
            className={clsx(classes.imgList, className)}
          >垂直：</span>
          <input
            type="radio"
            name="scrollType"
            value="vertical"
            checked={scrollType === "vertical"}
            onChange={onScrollTypeChange}
          />
        </label>
        <p
          className={clsx(classes.subtitle, className)}
        >已选择图片：</p>
        {
          nameList.map((el, idx) => {
            return (
              <div
                key={idx}
                className={clsx(classes.item, className)}
              >
                <span
                  className={clsx(classes.imgList, className)}
                >{el}</span>
                <Button
                  onClick={e => remove(e, idx)}
                >remove</Button>
              </div>
            )
          })
        }
        <input
          type="file"
          multiple
          onChange={addFile}
          className={clsx(classes.btn, className)}
        />
        <Button
          type="submit"
          className={clsx(classes.btn, className)}
        >
          upload all
        </Button>
      </form>

      <Typography
        className={classes.title}
        gutterBottom
        variant="h6"
      >
        {uploadStatus}
      </Typography>

      <Typography
        className={classes.title}
        gutterBottom
        variant="h6"
      >
        当前状态
      </Typography>
    </Card>
  )
}

DailySwiper.propTypes = {
  className: PropTypes.string
};

export default DailySwiper;
