import loadingGif from '../../public/loading.gif'

function LoadingComponent() {

    return (
        <div className='w-[100vh] h-[80vh] flex justify-center items-center z-2'>
            <img src={loadingGif} alt="" />
        </div>
    )
}

export default LoadingComponent