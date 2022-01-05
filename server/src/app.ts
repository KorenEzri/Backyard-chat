import cors from "cors";
import http from "http";
import helmet from "helmet";
import express from "express";
import { Server } from "socket.io";
import loggerMiddleWare from "./logger/morgan";
import connectToDb from "./mongo/connection";
import { notFound } from "./routes/not-found";
import socketHandler from "./controllers/socket-handler";
import routes from "./routes";

connectToDb();

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(helmet());
app.use(loggerMiddleWare);
app.use("/api", routes);
socketHandler(io);
app.set("socketio", io);
app.use(notFound);

export default server;
