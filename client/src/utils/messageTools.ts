import { Socket } from "socket.io-client";

export const sendPrivatMessage = (socket:Socket,username:string, message:string ) =>{
    socket.emit('private_message',{
        to: username,
        message
    })
}