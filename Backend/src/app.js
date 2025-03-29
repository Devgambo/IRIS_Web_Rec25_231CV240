import express from "express"
import cors from "cors"

//imports
import userRouter from "./routes/user.routes.js"
import equipRouter from "./routes/equip.routes.js"
import infraRouter from "./routes/infra.routes.js"
import equipReqRouter from "./routes/equipReq.routes.js"
import infraReqRouter from "./routes/infraReq.routes.js"
import categoryRouter from "./routes/category.routes.js"

const app = express()

// CORS config
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Handle preflight requests globally
app.options('*', cors());

// Configure JSON parsing for normal requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"))


//checking...
app.get("/", (req, res) => {
    res.status(200).json({ message: "API is running 🚀" });
});

//routes
app.use('/api/user', userRouter);
app.use('/api/equip', equipRouter);
app.use('/api/infra', infraRouter);
app.use('/api/equip-req', equipReqRouter);
app.use('/api/infra-req', infraReqRouter);
app.use('/api/category', categoryRouter);


export { app }