const Fuse = require('fuse')
const userModel = require('../models/user-model')

class filterService {
    filterMethod(array, term) {
        const fuse = new Fuse(array, {keys: ['name']})
        return fuse.search(term).map(u => u.item)
    }

    filterUsers(payload) {
        let filteredUsers = []
        if(payload.friends === 'true') {
            filteredUsers = userModel.find({_id: {$in: payload.heFollowed}})
            filteredUsers = this.filterMethod(filteredUsers, payload.term)
                        .skip((payload.page - 1) * payload.limit)
                        .limit(payload.limit);
        } else {
            filteredUsers = userModel.find({ $text: { $search: payload.term}})
                        .skip((payload.page - 1) * payload.limit)
                        .limit(payload.limit);
        }
        return filteredUsers
    }

    async autoComplete(payload) {
        return await userModel.find({ $text: {$search: payload}}).select('name').limit(5)
    }
}

module.exports = new filterService