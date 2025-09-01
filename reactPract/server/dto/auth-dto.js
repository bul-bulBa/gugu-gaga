module.exports = class AuthDto {

    constructor(module) {
        this.id = module._id.toString(),
        this.avatar = module.avatar,
        this.followed = module.followed
    }
}