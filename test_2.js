var loop = require('./loop_recur');

loop(function(x){
  console.log(x);
  if (x < 20000) {
    this.recur(x+1);
  } else {
    this.returning(x);
  }
})(0, function(val) { console.log("THIS IS THE VAL", val); });

