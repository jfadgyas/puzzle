'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { useRef } from "react"

import style from './style/search.module.scss'

const Search = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const inputRef = useRef<HTMLInputElement>(null)

    // Handle keystrokes, but send request only with every 1 second delay
    const handleSearch = () => {
        const searchValue = inputRef.current?.value!        
        debounce(searchValue)
    }

    // Handle delay
    const debounce = (searchValue: string) => {
        let isTyping = false

        if (isTyping) return

        setTimeout(() => {
            const newSearch = new URLSearchParams(searchParams)
            searchValue ? newSearch.set('search', searchValue) : newSearch.delete('search')
            isTyping = true
            
            router.replace(`?${newSearch}`, {scroll: false})
        }, 1000)
    }

    return (
        <label className={style.label}>
            <input
                className={style.input}
                id='search'
                name='search'
                type='text'
                placeholder='Search...'
                defaultValue={searchParams.get('search') || ''}
                ref={inputRef}
                onChange={handleSearch}
            />
        </label>
    )
}

export default Search