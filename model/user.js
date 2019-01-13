class User {
    constructor(userId, email, password, name, surname, position, pathToPhoto){
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname,
        this.position = position,
        this.pathToPhoto = pathToPhoto;
    }
}

module.exports = User;