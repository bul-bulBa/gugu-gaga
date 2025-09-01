import loadingGif from '../../public/loading.gif'

function LoadingComponent() {

    return (
        <div className='bg-stone-100/80 w-[1060px] h-[80vh] flex justify-center items-center z-3 absolute'>
            <img src={loadingGif} alt="" />
        </div>
    )
}

export default LoadingComponent