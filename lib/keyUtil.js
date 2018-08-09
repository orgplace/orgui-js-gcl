const keyUtil = {
  isDown: function(key) {
    // Firefox, Chrome - ArrowDown
    // Edge - Down
    return key === 'ArrowDown' || key === 'Down';
  },
  isLeft: function(key) {
    // Firefox, Chrome - ArrowLeft
    // Edge - Left
    return key === 'ArrowLeft' || key === 'Left';
  },
  isRight: function(key) {
    // Firefox, Chrome - ArrowRight
    // Edge - Right
    return key === 'ArrowRight' || key === 'Right';
  },
  isUp: function(key) {
    // Firefox, Chrome - ArrowUp
    // Edge - Up
    return key === 'ArrowUp' || key === 'Up';
  },
};

export default keyUtil;
