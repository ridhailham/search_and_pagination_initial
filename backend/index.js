import express from "express"
import cors from "cors"
import db from "./config/Database.js"
import UserRoutes from "./routes/UserRoute.js"


const app = express()
app.use(cors())
app.use(express.json())


db.sync()
    .then(() => {
        // seed.userSeed()
        // seed.categorySeed()
        console.log('database connected');
    })
    .catch((err) => {
        console.error('database connection failed', err);
    })

app.use(UserRoutes)

app.listen(4000, () => {
    console.log("running on port 5000");
})