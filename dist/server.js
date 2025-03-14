"use strict";

var _express = _interopRequireDefault(require("express"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _cors = _interopRequireDefault(require("./config/cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _api = _interopRequireDefault(require("./routes/api"));
var _connectDB = _interopRequireDefault(require("./config/connectDB"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
require("dotenv").config();
var app = (0, _express["default"])();
var PORT = process.env.PORT || 8080;

//config CORS
(0, _cors["default"])(app);

//config view engine
(0, _viewEngine["default"])(app);

// Cấu hình body-parser với giới hạn cao hơn (tăng lên 100MB)
app.use(_bodyParser["default"].json({
  limit: "100mb"
}));
app.use(_bodyParser["default"].urlencoded({
  limit: "100mb",
  extended: true
}));

//config body-parser
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));

//config cookie-parser
app.use((0, _cookieParser["default"])());

//test connection db
(0, _connectDB["default"])();

//init api routes
(0, _api["default"])(app);
app.listen(PORT, function () {
  console.log("Server is running on the port: " + PORT);
});