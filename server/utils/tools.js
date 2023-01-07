
const findSocketIdWithUsername = (users, username) =>{
    return users.find((usr) => usr.username === username)
    
}

module.exports = {
    findSocketIdWithUsername
}