import { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../@types/socketio";

export const ping = (socket: Socket<ServerToClientEvents, ClientToServerEvents>):number =>{
    console.log(socket.id, socket)
    socket.emit('ping', socket.id)
    return Date.now()
}

export const getPingTime = (time1:number, time2:number) =>{
    console.log(`pingstamp : ${time2} - ${time1}`)
    return time2 - time1
}