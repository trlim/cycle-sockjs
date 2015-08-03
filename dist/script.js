/* jshint esnext: true */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cycleCore = require('@cycle/core');

var _sockjsClient = require('sockjs-client');

var _sockjsClient2 = _interopRequireDefault(_sockjsClient);

function makeSockJSDriver(url, _reserved, options) {
  var sockjs = new _sockjsClient2['default'](url, _reserved, options);

  sockjs.onopen = function () {};

  return function sockJSDriver(event$) {
    event$.forEach(function (event) {
      return sockjs.send(event);
    });
    return _cycleCore.Rx.Observable.create(function (observer) {
      sockjs.onmessage = function (e) {
        observer.onNext(e.data);
      };
      sockjs.onclose = function () {
        console.log('close', url);
      };

      return function dispose() {
        sockjs.close();
      };
    });
  };
}

exports['default'] = { makeSockJSDriver: makeSockJSDriver };
module.exports = exports['default'];
