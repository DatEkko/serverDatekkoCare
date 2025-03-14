"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * 
 * @param {*} app
 */

var configViewEngine = function configViewEngine(app) {
  app.use(_express["default"]["static"]('./src/public'));
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};
var _default = exports["default"] = configViewEngine;