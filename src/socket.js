import { io } from "socket.io-client";

export const socket = io("http://sketchpad-app-backend:8000");
