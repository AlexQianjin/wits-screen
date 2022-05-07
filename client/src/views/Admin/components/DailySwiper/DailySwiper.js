import React, { useState } from 'react';
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
  }
}));

const DailySwiper = props => {
  const [list, setList] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  let count = 0;
  console.log(count++, list, list.length);
  const { className, ...rest } = props;

  const classes = useStyles();

  const refreshList = list => {
    return [].filter.call(list, el => el !== null && el !== '')
  }

  const addFile = e => {
    e.preventDefault();
    console.log(e);

    list.push(e.target.files[0]);
    nameList.push(e.target.files[0].name);
    setList(refreshList(list));
    setNameList(refreshList(nameList));
    console.log(list, nameList);
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

    fetch('/api/swiperImages', { method: 'POST', body: formData })
      .then(response => response.json())
      .then(data => {
        console.log(data);
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
        <p
          className={clsx(classes.imgList, className)}
        >已选择：</p>
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
        {/* <img src="C:\\fakepath\\图 (1).png" /> */}
        <input
          type="file"
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
    </Card>
  )
}

DailySwiper.propTypes = {
  className: PropTypes.string
};

export default DailySwiper;
