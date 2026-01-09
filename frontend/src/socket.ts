// import { io } from "socket.io-client";
// export const socket = io("http://localhost:5000");


import { io } from "socket.io-client";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://intervue-uyed.onrender.com";

export const socket = io(BACKEND_URL, {
  transports: ["websocket"],
  autoConnect: true,
});
