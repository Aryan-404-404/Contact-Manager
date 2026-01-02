import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import router from "./routes/contactRoutes.js"
dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()
connectDB()
app.use(cors())
app.use(express.json())
app.use('/', router)

app.get('/', (req, res)=>{
    res.status(200)
    res.send("Initial get request!")
})
app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`);
})