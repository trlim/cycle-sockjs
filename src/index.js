/* jshint esnext: true */
'use strict';

import {Rx} from '@cycle/core';
import SockJS from 'sockjs-client';

function makeSockJSDriver(url, _reserved, options) {
  let sockjs = new SockJS(url, _reserved, options);

  return function sockJSDriver(event$) {
    event$.forEach(event => sockjs.send(event));
    return Rx.Observable.create(observer => {
      sockjs.onopen = function() {
        console.log('open', url);
      };
      sockjs.onmessage = function(e) {
        observer.onNext(e.data);
      };
      sockjs.onclose = function() {
        console.log('close', url);
      };

      return function dispose() {
        sockjs.close();
      };
    });
  };
}

export default {makeSockJSDriver};
