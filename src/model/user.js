class User {
    constructor(userId, email, password, firstName, lastName, position, pathToPhoto){
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName,
        this.position = position,
        this.pathToPhoto = pathToPhoto;
    }
}

module.exports = User;