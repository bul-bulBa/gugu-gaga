export default class ChatterDto {
    
    constructor(model) {
        this._id = model._id
        this.name = model.name
        this.avatar = model.avatar
    }
}