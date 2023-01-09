
const findSocketIdWithUsername = (users, username) =>{
    return users.find((usr) => usr.username === username)
}

const nextRound = (io, gameRoom ) =>{

}

module.exports = {
    findSocketIdWithUsername
}