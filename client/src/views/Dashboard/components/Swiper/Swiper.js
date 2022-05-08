import React, { Component } from 'react';
// import _throttle from 'helpers/common';
import './style.css';
class Swiper extends Component {
  state = {
    list: [],
    time: 3000,
    timer: null,
    swiperList: [],
    activeIndex: 1,
    imgs: null
  }

  getImage() {
    fetch('/api/swiperImages', {})
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw (new Error('request swiperImage failed!'));
        }
      })
      .then(data => {
        console.log('swiper iamge data', data);
        const fileList = data.data.file;
        console.log(fileList);
        this.setState({
          list: data.data.file.map(el => 'data:image/png;base64,' + el),
          imgs: document.querySelector("#imgs"),
          time: data.data.setting_time
        }, () => {
          this.handleSwiper();
          console.log(this.state);
        })
      })
  }

  handleSwiper() {
    let list = [];
    let len = this.state.list.length;
    list.push(this.state.list[len - 1]);
    list = list.concat(this.state.list);
    list.push(this.state.list[0]);
    this.setState({
      swiperList: list
    }, () => {
      clearInterval(this.state.timer);
      this.setState({
        timer: null
      }, () => {
        this.actionSwiper();
      })
    })
  }

  componentDidMount() {
    //  挂载时开启时间控制
    this.checkState()
        .then(() => {
        this.setState({
          imgs: document.querySelector("#imgs")
        }, () => {
          this.actionSwiper();
        })
      });
    this.getImage();
}

  checkState() {
    // console.log(this.state.list, this.state.time);
    return this.testImgList().then(() => {
      let list = [];
      let len = this.state.list.length;
      list.push(this.state.list[len - 1]);
      list = list.concat(this.state.list);
      list.push(this.state.list[0]);

      this.setState({
        swiperList: list
      })
      console.log(this.state);
    });
  }

  testImgList() {
    return new Promise((resolve, reject) => {
      if (this.state.list?.length === 0) {
        this.setState({
          list: ['./../recommanded-image.png', './../recommanded-image2.png', './../recommanded-image3.png']
        })
        resolve(this.state);
      } else {
        reject(this.state)
      }
    })
  }

  actionSwiper() {
    let count = 1;
    let dom = this.state.imgs;
    this.setState(
      {
          timer: setInterval(() => {
          this.moveImg(dom, count, '%');
          count++;
          if (count === this.state.swiperList.length - 1) {
            count = 1;
          }
        }, this.state.time)
      })
  }

  moveImg(dom, picIdx, token) {
    let distance = 100;
    let step = distance / 60;
    let count = 0;
    let timer = null;
    let marginLeft = dom.style.marginLeft;
    marginLeft = marginLeft.split('');
    marginLeft.pop();
    let startPoint = marginLeft.join('');

    timer = setInterval(() => {
      startPoint -= step;
      dom.style.marginLeft = startPoint + token;
      count++;
      if (count >= 60) {
        clearInterval(timer);
        if (picIdx === 1) {
          dom.style.marginLeft = '-100%';
        }
      }
    }, 10)
  }

  render() {
    return (
      <div className={'box'}>
        <div
          id="imgs"
          style={{ marginLeft: '0%', marginTop: '35px', width: this.state.swiperList.length * 100 + '%' }}
        >
          {
            this.state.swiperList.map((el, index) => {
              return (
              <img
                style={{ width: 100 / this.state.swiperList.length + '%' }}
                key={index}
                src={el}
                alt={'pic'}
              ></img>)
            })
          }
        </div>
        {/* <div className={'dots-box'}>
          {
            this.state.list.length > 1 ?
              <ul className={'dots'}>
                {
                  this.state.list.map((el, index) => {
                    return <li key={index}></li>
                  })
                }
              </ul> : ''
          }
        </div> */}
      </div>
    )
  }
}

export default Swiper;
