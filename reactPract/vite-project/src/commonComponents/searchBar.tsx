import { useEffect, useState } from 'react'
import { memoSelectAutoCompNames, autoComplType, getAutoCompNamesThunk } from '../store/reducers/usersPageSlice'
import { useAppState, useAppDispatch } from '../store/StoreConfig'
import { AutoComplete, Button, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {useSearchParams } from 'react-router-dom'

type funcType = (arg: string) => void

function debounce(func: funcType, delay: number) {
    let timeout: number // Variable to hold the timer ID

    return function(arg: string) { // Returns a new function (the debounced version)

        clearTimeout(timeout); // Clear any existing timer

        timeout = setTimeout(() => {
            func(arg); // Execute the original function after the delay
        }, delay);
    };
}

const SearchBar = () => {
    const namesArr: autoComplType[] = useAppState(memoSelectAutoCompNames)
    const dispatch = useAppDispatch()
    const [queryParam, setQueryParam] = useSearchParams()
    const [termValue, setTermValue] = useState('')
    const [isFriends, setIsFriends] = useState('')

    const searchFunction = debounce((value: string) => {
        dispatch(getAutoCompNamesThunk(value))
    }, 300)

    return (
        <div className='w-full grid grid-cols-3'>

            <div className='col-start-2 flex justify-center items-center'>
                <AutoComplete
                    style={{ width: 200 }}
                    options={namesArr}
                    placeholder="find users"
                    onChange={(value: string) => { 
                        setTermValue(value)
                        if(value.length >= 3) searchFunction(value) } }
                    filterOption={(inputValue, option) =>
                    option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
                <Button icon={<SearchOutlined />} target="_blank"
                onClick={() => setQueryParam({term: termValue, friends: isFriends})} />
            </div>

            <div className='col-start-3 flex justify-end items-center'>
                <Select
                    defaultValue="Filter users"
                    style={{ width: 120 }}
                    onChange={(value: string) => {
                        const text = value === 'friends' ? 'true' : ''
                        setIsFriends(text)
                        setQueryParam({term: termValue, friends: text})
                    }}
                    options={[
                        { value: 'all', label: 'All' },
                        { value: 'friends', label: 'Friends' }
                    ]}
                />
            </div>

        </div>
    )
}

export default SearchBar