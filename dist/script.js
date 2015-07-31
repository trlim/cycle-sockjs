/* jshint esnext: true */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cycleCore = require('@cycle/core');

var _sockjsClient = require('sockjs-client');

var _sockjsClient2 = _interopRequireDefault(_sockjsClient);

function createSockJSDriver(url, _reserved, options) {
  var sockjs = new _sockjsClient2['default'](url, _reserved, options);

  function get(eventName) {
    return _cycleCore.Rx.Observable.create(function (observer) {
      var sub = sockjs.on(eventName, function (message) {
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
    events$.forEach(function (event) {
      return publish(event.messageType, event.message);
    });
    return {
      get: get,
      dispose: sockjs.destroy.bind(sockjs)
    };
  };
}

exports['default'] = { createSockJSDriver: createSockJSDriver };
module.exports = exports['default'];
