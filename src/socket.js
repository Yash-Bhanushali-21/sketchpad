import { io } from "socket.io-client";

export const socket = io("http://sketchpad-app-frontend:8000");
