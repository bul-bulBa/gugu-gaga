import { useEffect } from "react"

type propsType = {
    currentPage: number,
    allPages: number,
    Func: (page: number) => void
}

const  Pagination: React.FC<propsType> = ({currentPage, allPages, Func}) => {

    const newBtn = (i: number): React.ReactElement => {
        return (
        <button 
            key={i} 
            className={i == currentPage ? "activePaginationButton" : ''}
            onClick={i == currentPage ? undefined : (a) => Func(i)}>{i}
        </button>
        )
    }

    let arr: Array<React.ReactElement> = []

    const firstBtn = Math.max(1, currentPage - 1)
    const lastBtn = Math.min(allPages, currentPage + 2)

    for(let i = firstBtn; i <= lastBtn; i++){
        arr.push(newBtn(i))
    }

    return (
        <div className="flex justify-center select-none">

            {currentPage <= 1 ||
             <button onClick={() => Func(currentPage - 1)}>Prev</button>}

                {currentPage >= 3 && (
                    <div className="flex items-end">{newBtn(1)}...</div>
                )}
                {arr}

            {currentPage >= allPages ||
             <button onClick={() => Func(currentPage + 1)}>Next</button>}

        </div>
    )
}

export default Pagination