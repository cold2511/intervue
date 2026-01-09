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




import { app } from "./app";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import { pollSocket } from "./sockets/poll.socket";

// ✅ Connect to MongoDB Atlas using ENV
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error", err));

const httpServer = createServer(app);

// ✅ Socket.IO with open CORS
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

pollSocket(io);

// 🔴 CRITICAL FOR RENDER
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on ${PORT}`);
});
