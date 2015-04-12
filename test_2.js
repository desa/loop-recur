var loop = require('./loop_recur');

loop(function(x){
  console.log(x);
  if (x < 100000) {
    this.recur(x+1);
  } else {
    this.returning(x);
  }
})(0, function(val) { console.log(val); });
