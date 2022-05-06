import React, { useState } from 'react';
import { TextField, Button, Typography, Card } from '@material-ui/core';
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
  }
}));

const DailySwiper = props => {
  const [list, setList] = useState(['']);
  const [fileList, setFileList] = useState(['']);
  const [uploadStatus, setUploadStatus] = useState('');
  let count = 0;
  console.log(count++, list, list.length);
  const { className, ...rest } = props;

  const classes = useStyles();

  const clearList = list => {
    if (list) {
      return [].filter.call(list, el => el !== null);
    } else {
      return [];
    }
  }

  const handleChange = (e, idx) => {
    console.log(e);
    e.preventDefault();
    if (e.target.files.length !== 0) {
      list.splice(idx, 1, e.target.files[0].name);
      fileList.splice(idx, 1, e.target.files[0])
      setList(clearList(list));
      setFileList(clearList(fileList))
    }
  }

  const addFile = () => {
    list.push('');
    setList(clearList(list));
    console.log(count++, list);
  }

  const cancelFile = idx => {
    console.log(list, idx)
    list.splice(idx, 1, null);
    fileList.splice(idx, 1);
    setList(clearList(list));
    setFileList(clearList(fileList))
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
        {
          list.map((el, index) => {
            return (
              <div key={index}>
                <TextField
                variant="standard"
                type="file"
                inputProps={{ accept: 'image/*' }}
                  onChange={e => handleChange(e, index)}
                  value={el}
                >
                </TextField>
                <Button
                  className={clsx(classes.btn, className)}
                  onClick={() => cancelFile(index)}
                >
                  cancel
                </Button>
              </div>

            );
          })
        }
        <Button
          onClick={addFile}
          className={clsx(classes.btn, className)}
        >
          添加
        </Button>
        <Button
          type="submit"
          className={clsx(classes.btn, className)}
        >
          确定
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
