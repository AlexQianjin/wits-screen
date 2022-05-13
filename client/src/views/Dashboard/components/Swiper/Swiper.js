import React, { Component } from 'react';
// import _throttle from 'helpers/common';
import './style.css';
class Swiper extends Component {
  constructor(props) {
    super(props);
    console.log("props:", this.props);
  }

  state = {
    list: [],
    time: 3000,
    timer: null,
    swiperList: [],
    activeIndex: 1,
    imgs: null,
    type: 'leftright'
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
        data = data.data;
        this.setState({
          list: data.file.map(el => 'data:image/png;base64,' + el),
          imgs: document.querySelector("#imgs"),
          time: data.setting_time
        }, () => {
          this.handleSwiper();
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
    // console.log("props:", this.props);
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
    return this.testImgList().then(() => {
      let list = [];
      let len = this.state.list.length;
      list.push(this.state.list[len - 1]);
      list = list.concat(this.state.list);
      list.push(this.state.list[0]);

      this.setState({
        swiperList: list
      })
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
    let type = 'leftright'
    // if (this.state.type !== 'leftright') {
    //   type = 'updown';
    // }
    this.setState(
      {
          timer: setInterval(() => {
            this.moveImg(dom, type, count, '%');
          count++;
          if (count === this.state.swiperList.length - 1) {
            count = 1;
          }
        }, this.state.time)
      })
  }

  moveImg(dom, type, picIdx, token) {
    // if (type === 'leftright') {
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
    // } else {
    //   let distance = 380;
    //   let step = distance / 60;
    //   let count = 0;
    //   let marginTop = dom.style.marginLeft;
    //   marginTop = marginTop.split('');
    //   marginTop.pop();
    //   marginTop.pop();
    //   let startPoint = marginTop.join('');
    //   let startTag = startPoint;
    //   let timer = null;
    //   timer = setInterval(() => {
    //     startPoint -= step;
    //     dom.style.marginTop = startPoint + token;
    //     count++;
    //     if (count >= 60) {
    //       dom.style.marginTop = -(Number(startTag) + 380) + 'px';
    //       clearInterval(timer);
    //       if (picIdx === 1) {
    //         dom.style.marginTop = '-380px';
    //       }
    //     }
    //   }, 10)
    // }
  }

  render() {
    // if (this.props === 'updown') {
      // return (
      //   <div className={'ud-box'}>
      //     <div
      //       className={'ud-sub-box'}
      //       id="imgs"
      //       style={{ marginTop: '0', height: this.state.swiperList.length * 380 + 'px' }}
      //     >
      //       {
      //         this.state.swiperList.map((el, index) => {
      //           return (
      //             <img
      //               style={{ height: '380px' }}
      //               key={index}
      //               src={el}
      //               alt={'pic'}
      //             ></img>)
      //         })
      //       }
      //     </div>
      //   </div>
      // )
    // } else {
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
        </div>
      )
    // }
  }
}

export default Swiper;
