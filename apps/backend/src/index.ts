import express from "express";
import dbConnection from './utils/dbConnect'
import session from 'express-session'
import passport from 'passport'
require('dotenv').config();
require('./auth')
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from './api'
const app = express();

app.use(express.json())

// Handle Cors
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: "*",
  })
);
// Parese cookies
app.use(cookieParser());

const authSecret =  process.env.AUTH_SECRET as string
app.use(session({ secret: authSecret, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", apiRoutes);

app.get('/',(req,res)=>{
  res.send('<a href="/api/v1/user/auth/google">gOOGLE</a>')
})
const PORT = process.env.PORT

app.listen(PORT, async () => {
  console.info(`App is running at http://localhost:${PORT}`);
  await dbConnection();
});