# react-tips
**Stale Closure**
*The stale closure captures variables that have outdated values.*


### Stale closure example ###
```
function createIncrement(incBy) {
  let value = 0;
  function increment() {
    value += incBy;
    console.log(value);
  }
  const message = 'Current value is ${value}';
  function log() {
    console.log(message);
  }
  
  return [increment, log];
}
const [increment, log] = createIncrement(1);
increment(); // logs 1
increment(); // logs 2
increment(); // logs 3
// Does not work!
log();       // logs "Current value is 0"
```
