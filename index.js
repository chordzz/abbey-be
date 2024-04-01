import express from "express"
import cors from "cors"
import "dotenv/config"

import dbClient from "./datasource/db.js"
import router from "./routes/index.js"

const app = express()
const port = 5000 || process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api", router)

dbClient
    .sync({ alter: true })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error(err.message))


app.listen(port, () => console.log(`Server running on port ${port}`))