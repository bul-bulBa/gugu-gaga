import Dialogs from "./Dialogs"
import DialogItems from "./DialogItems"

const ws = new WebSocket('ws://localhost:3000')
ws.onmessage = message => console.log(message)

const DialogsPage = () => {
    return (
        <div className='flex gap-[15%] p-10'>
            <DialogItems />

            <div className='border-r-1'></div>

            <Dialogs />
        </div>
    )
}

export default DialogsPage