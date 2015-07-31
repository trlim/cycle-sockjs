# Cycle-SockJS

A [Cycle](http://cycle.js.org/) driver for applications using [SockJS](http://sockjs.org/)
Based on [Cycle-Socket.IO](https://github.com/cgeorg/cycle-socket.io)

## Usage

```jsvascript
import Cycle from '@cycle/core';
import SockJS from 'cycle-sockjs';

var computer = function ({sockjs, dom}) {
    const vtree$ = render(dom);

    const incomingMessages$ = sockjs.get('messageType');
    const outgoingMessages$ = stream$.map( eventData => {
      {
        messageType: 'someEvent',
        message: eventData
      }
    });

    return {dom: vtree$, sockJS: outgoingMessages$}
};

var sockjsDriver = SockJS.createSockJSDriver(window.location.origin);
var domDriver = Cycle.makeDOMDriver(document.body);
Cycle.run(computer, {
    dom: domDriver,
    sockjs: sockjsDriver
});
```
