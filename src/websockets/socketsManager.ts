import express, { Application } from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import { socketMiddleware } from "../middleware/socket";
import { ISocket } from "../interfaces/socket";

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);

io.use(socketMiddleware);

io.on("connection", (socket: ISocket) => {
  console.log(socket.user.name, "connected");

  socket.on("message", (data: any, room) => {
    if (room === '') {
      console.log("message received:", data);
      socket.broadcast.emit("message", data);
    } else {
      socket.to(room).emit("message", data);
    }
  });

  socket.on('joinRoom', room => {
    socket.join(room)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3002, () => {
  console.log("Socket.io is listening on 3002");
});
