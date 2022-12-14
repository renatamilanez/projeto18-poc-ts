import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
var server = express();
server.use(express.json());
server.use(cors());
//server.use(routes);
server.listen(process.env.PORT, function () {
    console.log("Server is listening on port ".concat(process.env.PORT));
});