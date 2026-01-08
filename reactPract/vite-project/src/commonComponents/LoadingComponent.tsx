import loadingGif from '../../public/loading.gif'

function LoadingComponent() {

    return (
        <div className='bg-stone-100/80 w-[100vw] h-[100vh] flex justify-center items-center z-3 absolute bottom-0 left-0'>
            <img src={loadingGif} alt="" />
        </div>
    )
}

export default LoadingComponent