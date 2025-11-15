import userPhoto from '../../../assets/userPhoto.webp'
import {dialogsMessageType} from '../../../store/reducers/dialogsPageSlice'
import { setEditMessage, setValue } from '../../../store/reducers/addMessageSlice';
import { useAppDispatch } from '../../../store/StoreConfig';
import  { deleteMessage } from '../DialogsPage'
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

const items: MenuProps['items'] = [
  {
    label: 'Edit',
    key: '1',
  },
  {
    label: 'Delete',
    key: '2',
  },
];

type propsType = {message: dialogsMessageType, position: string, date: string}

const Message = ({message, position, date}: propsType) => {
    const dispatch = useAppDispatch()

    const menu = {
        items,
        onClick: (info: any) => {
            if(info.key === '1') {
                dispatch(setEditMessage(message._id))
                dispatch(setValue(message.text))
            }
            if(info.key === '2') deleteMessage(message._id)
        }
    }
    console.log(position)
    return (
        // костиль з justify, але мені в падлу міняти
        <div className={`flex gap-1 m-2 msg  ${position === 'left' ? 'justify-start' : 'justify-end'}`}
         style={{ backgroundColor: '#333', }} >
            <Dropdown menu={menu} trigger={['contextMenu']}>
                <div className="bg-gray-100 rounded-xl grid grid-rows-[1fr_20px] gap-3 max-w-4/5 min-w-[130px] p-2">
                    <div className="row-start-1 flex text-left break-all"> {message.text} </div>
                    {message.edited && <span className='text-xs row-start-2 flex justify-end'>edited</span>}
                    <span className="text-xs row-start-2 flex justify-end"> {date} </span>
                </div>
            </Dropdown>
        </div>
    )
}
export default Message