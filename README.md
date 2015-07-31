# Cycle-SockJS

A [Cycle](http://cycle.js.org/) driver for applications using [SockJS](http://sockjs.org/)
Based on [Cycle-Socket.IO](https://github.com/cgeorg/cycle-socket.io)

## Usage

```javascript
import Cycle from '@cycle/core';
import SockJS from 'cycle-sockjs';

var main({sockjs, dom}) {
  const vtree$ = render(dom);

  let incoming$ = sockjs;
  let outgoing$ = incoming$.map(message => {
    {
      message
    }
  });

  return {dom: vtree$, sockjs: outgoing$}
};

var domDriver = Cycle.makeDOMDriver(document.body);
var sockJSDriver = SockJS.makeSockJSDriver(window.location.origin);

Cycle.run(main, {
  dom: domDriver,
  sockjs: sockJSDriver
});
```
