import userPhoto from '../../../assets/userPhoto.webp'
import {dialogsMessageType} from '../../../store/reducers/dialogsPageSlice'
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

const Message = (props: any) => {

    const menu = {
        items,
        onClick: (info: any) => {
            if(info.key === '2') deleteMessage(props.messageId)
        }
    }

    return (
        <div className={`flex gap-1 m-2 msg ${props.position}`} >
            <Dropdown menu={menu} trigger={['contextMenu']}>
                <div className="bg-gray-100 rounded-xl grid grid-rows-[1fr_20px] gap-3 max-w-3/5 min-w-[130px] p-2">
                    <div className="row-start-1 flex text-left break-all"> {props.text} </div>
                    <span className="text-xs row-start-2 flex justify-end"> {props.date} </span>
                </div>
            </Dropdown>
        </div>
    )
}
export default Message