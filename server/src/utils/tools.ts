import { PlayingGameInterface } from "../@types/game"
import { ConnectedUsersInterface } from "../@types/socket"

const findSocketIdWithUsername = (users:ConnectedUsersInterface[], username:string):ConnectedUsersInterface =>{
    return users.find((usr) => usr.username === username)
}

const findUsernameWithSocketId = (users:ConnectedUsersInterface[], socketId:string):string =>{
    return users.find(usr => usr.socketID===socketId).username
}

const findRunningGameWithAUserName = (games:PlayingGameInterface[],usernameToFind:string):PlayingGameInterface|null =>{
    const foundGame = games.find(game=>game.player1===usernameToFind || game.player2===usernameToFind)
    return foundGame ? foundGame : null
}

// const nextRound = (io, gameRoom ) =>{

// }

module.exports = {
    findSocketIdWithUsername,
    findUsernameWithSocketId,
    findRunningGameWithAUserName
}