import express from "express"
import cors from "cors"
//imports
import userRoutes from "./routes/userRoutes.js"

const app = express()


// CORS config
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Handle preflight requests globally
app.options('*', cors());

app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ limit: '50kb', extended: true }));

//routes
app.use('/api/user' , userRoutes);


export { app }