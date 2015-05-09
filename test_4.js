var loop = require('./loop_recur');

loop(function(xs, ys, f){
  if (xs.length < 1) {
    this.returning(ys);
  } else {
    var yy = ys.concat(f(xs[0]));
    var xx = xs.slice(1)
    this.recur(xx, yy, f);
  }
})([1,2,3,4,5],[],function(x) { return x * x; }, function(val) { console.log(val); })

// Each

var each = function each(xs, fn) {
  return function(cb) {
    return loop(function(arr) {
      if (arr.length < 1) {
        this.returning();
      } else {
        fn(arr[0]);
        this.recur(arr.slice(1));
      }
    })(xs, cb);
  };
};

var words = ["hello","world","its","nice","to","meet","you"];

each(words, function(word) {
  if (word === "hello") {
    console.log(word, "michael");
  } else {
    console.log(word);
  }
})(function() { console.log("we did it"); });

// MAP

var map = function map(fn, xs) {
  return function(cb) {
    return loop(1,function(arr, sol) {
      if (arr.length < 1) {
        this.returning(sol);
      } else {
        var fx = fn(arr[0]);
        var tempSol = sol.concat(fx);
        var tempArr = arr.slice(1);
        this.recur(tempArr, tempSol);
      }
    })(xs, [], cb);
  };
};


map(function(x) { return x+x; }, [4,2,4,5,6])
    (function(val) { console.log(val); });

//somethings a little bit off here
    var async_map = function async_map(fn, xs) {
      var count = 0;
      var arr = [];
      var i = 0;
      return function(cb) {
        return loop(1, function() {
          var _this = this;
          fn(xs[i], function(n) {
            arr[i] = n;
            count += 1;
            if (xs.length === count) return _this.returning(arr);
            _this.recur();
            i+=1;
          });
        })(cb)
      };
    };

var asyncMap = function asyncMap(fn, xs) {
  var count = 0;
  return function(cb) {
    return loop(1, function(arr, i) {
      var _this = this;
      fn(arr[i], function(n) {
        if (xs.length === i) return _this.returning(arr);
        console.log(count);
        console.log("IN CALLBACK",arr[i], n);
        count += 1;
        var ys = arr;
        ys[i] = n;
        _this.recur(ys, i+1);
      });
    })(xs, 0, cb);
  };
};

async_map(function(x, cb) {
  var randomTime = Math.floor(Math.random() * 100);
  setTimeout(function(){
    console.log(x);
    cb(x*10);
  }, x*10);
},[60,23,32,40,50])
  (function(x) {
    console.log("THIS IS X",x);
  });

//normal map

var map2 = function(xs,fn) {
  var result = [];
  xs.forEach(function(x) {
    result.push(fn(x));
  });
  return result;
};

console.log(map2([1,2,3], function(x) { return x + x; }));
