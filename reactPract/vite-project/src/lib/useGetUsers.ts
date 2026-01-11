import { useAppState} from '../store/StoreConfig'
import { selectChatter } from '../store/reducers/dialogsPageSlice'
import { selectAuthId } from '../store/reducers/authInfoSlice'

export const useGetUsers = () => {
    const userA = useAppState(selectAuthId)
    const { _id: userB } = useAppState(selectChatter)

    return {userA, userB}
}