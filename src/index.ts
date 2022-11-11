import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import moviesRouters from "./routes/movies-routers.js";
import signInRouters from "./routes/signIn-router.js";
import signUpRouters from "./routes/signUp-router.js";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(moviesRouters);
server.use(signInRouters);
server.use(signUpRouters);

server.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});