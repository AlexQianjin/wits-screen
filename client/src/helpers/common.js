export default function _throttle(fn, time) {
  let flg = false;
  return function () {
    let args = Array.prototype.slice.call(arguments);
    if (flg === false) {
      flg = true;
      fn.apply(this, args);
      setTimeout(() => {
        flg = false;
      }, time);
    }
  }
}