var loop = require('./loop_recur');

loop(function(x){
  console.log(x);
  if (x < 100000) {
    return this.recur(x+1);
  } else {
    return "done";
  }
})(0, function(val) { console.log(val); });
