"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _apiController = _interopRequireDefault(require("./../controller/apiController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

/**
 * 
 * @param {*} app 
 */

var initApiRoutes = function initApiRoutes(app) {
  router.get('/read', _apiController["default"].readFunction);
  router.post('/create', _apiController["default"].createFunction);
  router["delete"]('/delete', _apiController["default"].deleteFunction);
  router.put('/update', _apiController["default"].updateFunction);
  return app.use("/api/v1", router);
};
var _default = exports["default"] = initApiRoutes;