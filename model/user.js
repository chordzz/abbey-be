import { DataTypes, UUIDV4 } from "sequelize";
import dbClient from "../datasource/db.js"
import bcrypt from "bcryptjs"

import Friend from "./friend.js";

const User = dbClient.define(
    "user",
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

User.beforeCreate(async (user) => {
    try {
        const hash = await bcrypt.hash(user.password, 12);
        user.password = hash;
    } catch (err){
        throw new Error(err.message)
    }
});

User.hasMany(Friend, { as: "friends" })
Friend.belongsTo(User)

export default User;