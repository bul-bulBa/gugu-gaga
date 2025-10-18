export default class UserDto {

    constructor(model) {
        this.id = model._id.toString()
        this.name = model.name
        this.about = model.about
        this.avatar = model.avatar
        this.profilePhoto = model.profilePhoto
        this.location = model.location
        this.followed = model.followed
        this.status = model.status
    }
}