var loop = require('./loop_recur');

loop(function(n,fact) {
  console.log(n,fact);
  if (n<2) {
    return this.returning(fact);
  } else { 
    return this.recur(n-1, fact * n);
  } 
})(6,1, function(result){ console.log(result); })

