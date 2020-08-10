import React from 'react'
import socketIOClient from "socket.io-client";

const endPoint = "http://localhost:9008/";
const socket = socketIOClient(endPoint);
export default socket; 