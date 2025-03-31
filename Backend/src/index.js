import dotenv from "dotenv";
import connectDB from "./dbConnect.js";
import {app} from "./app.js"

import { startReminderScheduler } from "./utils/reminderScheduler.js"

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        startReminderScheduler()
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})