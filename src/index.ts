import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import moviesRouters from "./routes/movies-routers.js";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(moviesRouters);

server.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});