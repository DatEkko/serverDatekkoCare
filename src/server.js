require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import configCORS from "./config/cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import initApiRoutes from "./routes/api";
import connection from "./config/connectDB";


const app = express();
const PORT = process.env.PORT || 8080;

//config CORS
configCORS(app);

//config view engine
configViewEngine(app);


// Cấu hình body-parser với giới hạn cao hơn (tăng lên 100MB)
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));


//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie-parser
app.use(cookieParser());

//test connection db
connection();

//init api routes
initApiRoutes(app);

app.listen(PORT, () => {
    console.log("Server is running on the port: " + PORT)
})