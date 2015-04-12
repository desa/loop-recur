require('setimmediate');

function recur() {
  var _fn = arguments[0] || null;
  var ctx = arguments[1] || null;
  var _cb = arguments[arguments.length -1] || null;
  ctx.cb = ctx.cb || _cb;
  var args = Array.prototype.slice.call(arguments, 2, arguments.length);
  if (ctx.done) {
    ctx.cb(args[0]);
  } else {
    setImmediate(function(cx,ars) {
      _fn.apply(cx, ars);
    }, ctx,args);
  }
};

function returning() {
  var val = arguments[1];
  var ctx = arguments[0];
  ctx.done = true;
  return this.recur(val);
};

module.exports = function loop(fn) {
  if (this instanceof loop) {
    this.done = false;
    this.returning = returning.bind(this, this);
    this.recur = recur.bind(undefined, fn, this);
    return this.recur;
  } else {
    return new loop(fn);
  }
};


