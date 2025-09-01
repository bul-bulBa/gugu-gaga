module.exports = class UserCardDto {

    constructor(model) {
        this.id = model._id.toString()
        this.name = model.name
        this.about = model.about
        this.avatar = model.avatar
        this.location = model.location
    }
}