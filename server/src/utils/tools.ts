import { ConnectedUsersInterface } from "../@types/socket"

const findSocketIdWithUsername = (users:ConnectedUsersInterface[], username:string):ConnectedUsersInterface =>{
    return users.find((usr) => usr.username === username)
}

const findUsernameWithSocketId = (users:ConnectedUsersInterface[], socketId:string):string =>{
    return users.find(usr => usr.socketID===socketId).username
}

// const nextRound = (io, gameRoom ) =>{

// }

module.exports = {
    findSocketIdWithUsername,
    findUsernameWithSocketId
}