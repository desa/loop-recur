var loop = require('./loop_recur');

loop(function(n,fact) {
  console.log(n,fact);
  if (n<2) {
    this.returning(fact);
  } else { 
    this.recur(n-1, fact * n);
  } 
})(6,1, function(result){ console.log(result); })
