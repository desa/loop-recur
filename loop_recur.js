var recur = function recur() {
  var _fn = arguments[0] || null;
  var _cb = arguments[arguments.length -1] || null;
  var ctx = this;
  var _bs = this.batchSize;
  ctx.cb = ctx.cb || _cb;
  var args = Array.prototype.slice.call(arguments, 1, arguments.length);
  if (ctx.done) {
    ctx.cb(args[0]);
  } else {
    setImmediate(function(cx,ars) {
      var params = [_bs,_fn].concat(ars);
      var loopBatch = batchLoop.apply(null,params);
      if (loopBatch.complete) {
        cx.cb(loopBatch.result[0]);
      } else {
        var batchParams = loopBatch.args;
        _fn.apply(cx, batchParams);
      }
    }, ctx,args);
  }
};

var returning = function returning() {
  var val = arguments[0];
  this.done = true;
  return this.recur(val);
};

module.exports = function loop() {
  var batchSize = typeof arguments[0] === 'function' ? 100 : arguments[0];
  var func = typeof arguments[0] === 'function' ? arguments[0] : arguments[1];
  if (this instanceof loop) {
    this.done = false;
    this.batchSize = batchSize;
    this.returning = returning.bind(this);
    this.recur = recur.bind(this, func);
    return this.recur;
  } else {
    return new loop(batchSize, func);
  }
};

////

var batchLoop = function batchLoop(bs, fn) {
  var args = Array.prototype.slice.call(arguments, 2, arguments.length);
  var batch = new Batch(bs);
  var func = fn.bind(batch);
  batch.fn = func
  batch.fn.complete = false;
  batch.args = args;
  batch.complete = false;
  while (batch.count > 1 && !batch.complete) {
    batch = batch.next();
    batch.complete = !!batch.result;
    if (batch.complete) {
      return batch;
    }
  }
  //console.log("DONE");
  return batch;
};

function Batch(n) {
  this.count = n;
};

Batch.prototype.next = function() {
  var fnc = this.fn;
  fnc = this.fn.bind(this);
  this.fn.complete = fnc.apply(this, this.args);
  this.count--;
  return this;
};

Batch.prototype.recur = function() {
  this.args = Array.prototype.slice.call(arguments);
  return false;
};

Batch.prototype.returning = function() {
  this.result = Array.prototype.slice.call(arguments);
  return true;
};

