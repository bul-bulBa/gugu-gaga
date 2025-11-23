export default class PostDto {

    constructor(post, user, repliedPost, repliedUser) {
        this._id = post._id
        this.text = post.text
        this.likes = post.likes
        this.user = {
            _id: user._id,
            name: user.name,
            avatar: user.avatar
        }
        if(post.img) this.img = post.img
        if(repliedPost && repliedUser) {
            this.repliedPost = {
                text: repliedPost.text,
                name: repliedUser.name,
                avatar: repliedUser.avatar,
                img: repliedPost.img ? repliedPost.img : []
            }

        }
    }
}