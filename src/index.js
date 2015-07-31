/* jshint esnext: true */
import {Rx} from '@cycle/core';
import SockJS from 'sockjs-client';

function createSockJSDriver(url, _reserved, options) {
  const sockjs = new SockJS(url, _reserved, options);

  function get(eventName) {
    return Rx.Observable.create(observer => {
      const sub = sockjs.on(eventName, function (message) {
        observer.onNext(message);
      });
      return function dispose() {
        sub.dispose();
      };
    });
  }

  function publish(messageType, message) {
    socjs.emit(messageType, message);
  }

  return function sockJSDriver(events$) {
    events$.forEach(event => publish(event.messageType, event.message));
    return {
      get,
      dispose: sockjs.destroy.bind(sockjs)
    };
  };
}

export default {createSockJSDriver};
