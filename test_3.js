var f = function f(k) {
  console.log("WHAT",this);
  console.log("K is:", this.args);
  if (k < 200) {
    return this.recur(k + 2);
  } else {
    return this.returning(2000);
  }
};

var bl = new batchLoop(f, 0);

var f2 = function f2(k,fact) {
  console.log("WHAT",this);
  console.log("K is:", this.args);
  if (k === 1) {
    return this.returning(fact);
  } else {
    return this.recur(k-1, fact*k);
  }
};

var bl2 = new batchLoop(f2, 10, 1)

var f3 = function f3(k,sum) {
  console.log("WHAT",this);
  console.log("K is:", this.args);
  if (k > 100) {
    return this.returning(sum);
  } else {
    return this.recur(k+1, sum+k);
  }
};

var bl3 = new batchLoop(f3, 0, 0)

