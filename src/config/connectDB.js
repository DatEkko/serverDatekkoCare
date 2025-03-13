import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(
    isProduction ? process.env.DB_NAME : "datekkocaredb",
    isProduction ? process.env.DB_USERNAME : "root",
    isProduction ? process.env.DB_PASSWORD : null,
    {
        host: isProduction ? process.env.DB_HOST : "127.0.0.1",
        port: isProduction ? process.env.DB_PORT : 3306,
        dialect: "mysql",
        logging: false,
    }
);

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connected to the ${isProduction ? "production" : "local"} database successfully.`);
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export default connection;
