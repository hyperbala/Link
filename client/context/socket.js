"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext)
    return socket
}

export const SocketProvider = (props) => {
  const { children } = props;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connection = io("http://localhost:3000")
    console.log("socket connection", connection)
    setSocket(connection);
  }, []);

  socket?.on('connect_error', async (err) => {
    console.log("Error establishing socket", err)
  })
  // socket?.on('user-connected', async (e) => {
  //   console.log("user connected")
  // })

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};