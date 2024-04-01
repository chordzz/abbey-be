import { Sequelize } from "sequelize"
import "dotenv/config"

const dbClient = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: parseInt(process.env.DB_PORT),
        logging: false,
        pool: {
            max: 2,
            min: 0,
            acquire: 3000,
            idle: 0
        },
        define: {
            freezeTableName: true
        }
    }
)

export default dbClient;