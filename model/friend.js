import { DataTypes, UUIDV4 } from "sequelize";
import dbClient from "../datasource/db.js"

const Friend = dbClient.define(
    'friend',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    },
    {
        timestamps: true,
    }
);

export default Friend;