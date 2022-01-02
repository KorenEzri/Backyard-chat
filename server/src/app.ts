import cors from "cors";
import http from "http";
import helmet from "helmet";
import express from "express";
import loggerMiddleWare from "./logger/morgan";
import connectToDb from "./db/connection";
import { notFound } from "./routes/notFound";

connectToDb();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(loggerMiddleWare);
app.use(notFound);

export default server;
