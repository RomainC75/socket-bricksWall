import { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../@types/socketio";

export const ping = (socket: Socket<ServerToClientEvents, ClientToServerEvents>):number =>{
    socket.emit('ping', socket.id)
    return Date.now()
}

export const getPingTime = (time1:number, time2:number) =>{
    return time2 - time1
}