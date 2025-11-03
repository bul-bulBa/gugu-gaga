import Fuse from 'fuse.js'
import userModel from '../models/user-model.js'

class FilterService {
    filterMethod(array, term) {
        const fuse = new Fuse(array, {keys: ['name']})
        return fuse.search(term).map(u => u.item)
    }

    async filterUsers(payload) {
      return !payload.term || payload.term === "null" 
      ? userModel.find({}).skip((payload.page - 1) * payload.limit).limit(payload.limit)
      : userModel.find({ $text: { $search: payload.term}})
                    .skip((payload.page - 1) * payload.limit).limit(payload.limit)

    }

    async filterFriends(payload) {
      const filteredUsers = await userModel.find({_id: {$in: payload.heFollowed}})

      return payload.term === 'null' || !payload.term.trim() 
      ? filteredUsers
      : this.filterMethod(filteredUsers, payload.term)
              .slice((payload.page - 1) * payload.limit, payload.page * payload.limit)
      
    }

    async filter(term, heFollowed, page, limit) {
      let query = {}
      if(term && term !== 'null' && term !== '') query.$text = { $search: term}
      if(heFollowed) query._id = {$in: heFollowed}

      const users = await userModel.find(query).skip((page - 1) * limit).limit(limit)
      const allUsers = await userModel.countDocuments(query)
      return {users, allUsers}
    }

    async autoComplete(payload) {
        // return await userModel.find({ $text: {$search: payload}}).select('name').limit(5)

        return await userModel.aggregate([
            {
                $search: {
                    index: "name", // або назва, яку ти дав індексу
                    autocomplete: {
                    query: payload,   // те, що ввів користувач
                    path: "name"    // поле, по якому шукаєш
                  }
                }
              },
              { $limit: 5 },       // обмеження кількості результатів
              {
                $project: {          // які поля повертати
                  name: 1,
                }
              }
        ])
    }
}

export default new FilterService