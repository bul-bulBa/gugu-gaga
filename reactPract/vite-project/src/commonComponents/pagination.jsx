import { useEffect } from "react"
function Pagination({currentPage, allPages, Func}) {
    const newBtn = (i) => {
        return (
        <button 
            key={i} 
            className={i == currentPage ? "activePaginationButton" : ''}
            onClick={i == currentPage ? undefined : e => Func(+e.target.textContent)}>{i}
        </button>
        )
    }

    let arr = []

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