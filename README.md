# Loop Recur
**Note: At this moment this is a proof of concept library and is completely unstable.**
`loop-recur` is an javascript implementation of [Clojures loop and recur](https://clojuredocs.org/clojure.core/loop).

## Installation
```bash
npm install loop-recur
```

## Use

```js
var loop = require('loop-recur');

loop(function(n,fact) {
  console.log(n,fact);
  if (n<2) {
    this.returning(fact);
  } else { 
    this.recur(n-1, fact * n);
  } 
})(6,1, function(result){
  console.log("FACTORIAL:", result); });
```

## Format

```js
loop( function( [args] ) { 
  if ( [recursive condition] ) {
    this.recur( [adjusted args] );
  } else {
    this.returning( [return value] );
  }
})( [arg1] , ... , [argn] , [callback]);
```
