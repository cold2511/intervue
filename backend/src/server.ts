// import { app } from "./app";
// import mongoose from "mongoose";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import { pollSocket } from "./sockets/poll.socket";



// mongoose.connect("mongodb://127.0.0.1:27017/poll")
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB error", err));

// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: { origin: "*" }
// });

// pollSocket(io);

// httpServer.listen(5000, () => {
//   console.log("Backend running on 5000");
// });




// import { app } from "./app";
// import mongoose from "mongoose";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import { pollSocket } from "./sockets/poll.socket";

// // ✅ Connect to MongoDB Atlas using ENV
// mongoose
//   .connect(process.env.MONGO_URI as string)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB error", err));

// const httpServer = createServer(app);

// // ✅ Socket.IO with open CORS
// const io = new Server(httpServer, {
//   cors: {
//     origin: "*",
//   },
// });

// pollSocket(io);

// // 🔴 CRITICAL FOR RENDER
// const PORT = process.env.PORT || 5000;

// httpServer.listen(PORT, "0.0.0.0", () => {
//   console.log(`Backend running on ${PORT}`);
// });




// import { app } from "./app";
// import mongoose from "mongoose";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import { pollSocket } from "./sockets/poll.socket";

// mongoose
//   .connect(process.env.MONGO_URI as string)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB error", err));

// const httpServer = createServer(app);

// const io = new Server(httpServer, {
//   cors: { origin: "*" }
// });

// pollSocket(io);

// const PORT = process.env.PORT || 5000;

// httpServer.listen(PORT, "0.0.0.0", () => {
//   console.log(`Backend running on ${PORT}`);
// });



// import { app } from "./app";
// import mongoose from "mongoose";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import { pollSocket } from "./sockets/poll.socket";

// mongoose
//   .connect(process.env.MONGO_URI as string)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB error", err));

// const httpServer = createServer(app);

// const io = new Server(httpServer, {
//   cors: { origin: "*" }
// });

// pollSocket(io);

// // ✅ FIX: ensure PORT is a number
// const PORT = Number(process.env.PORT) || 5000;

// httpServer.listen(PORT, "0.0.0.0", () => {
//   console.log(`Backend running on ${PORT}`);
// });



// 🔴 MUST be at the very top
import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import { pollSocket } from "./sockets/poll.socket";

// ✅ MongoDB connection (Atlas on Render, local on dev)
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error", err));

const httpServer = createServer(app);

// ✅ Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

pollSocket(io);

// ✅ Correct port handling for local + Render
const PORT = Number(process.env.PORT) || 5000;

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on ${PORT}`);
});
