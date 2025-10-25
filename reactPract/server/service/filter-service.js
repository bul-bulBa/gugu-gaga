import Fuse from 'fuse.js'
import userModel from '../models/user-model.js'

class FilterService {
    filterMethod(array, term) {
      // console.log("TERM ", term)
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