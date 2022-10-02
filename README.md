# react-tips
**Stale Closure**
*The stale closure captures variables that have outdated values.*


## **Stale closure example** ##
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

**Fixing the stale closure**
```
function createIncrement(incBy) {
  let value = 0;
  function increment() {
    value += incBy;
    console.log(value);
  }
  function log() {
    const message = `Current value is ${value}`;
    console.log(message);
  }
  
  return [increment, log];
}
const [increment, log] = createIncrement(1);
increment(); // logs 1
increment(); // logs 2
increment(); // logs 3
// Works!
log();       // logs "Current value is 3"
```

# React stale closure useEffect example #

```
function WatchCount() {
  const [count, setCount] = useState(0);
  useEffect(function() {
    setInterval(function log() {
      console.log(`Count is: ${count}`); // logs count as 0 even if user clicks to increase the count
    }, 2000);
  }, []);
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1) }>
        Increase
      </button>
    </div>
  );
```
## useEffect fix example ##

```
function WatchCount() {
  const [count, setCount] = useState(0);
  useEffect(function() {
    const id = setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 2000);
    return function() {
      clearInterval(id); // React also cleans up effects from the previous render before running the effects next time.
    }
  }, [count]); // With the dependencies properly set, useEffect() updates the closure as soon as count changes.
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1) }>
        Increase
      </button>
    </div>
  );
}
```


