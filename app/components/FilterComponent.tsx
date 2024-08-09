'use client'

import { useRef, ChangeEvent } from "react"
import { useSearchParams, useRouter } from "next/navigation"

const FilterComponent = () => {

    const router = useRouter()
    const searchParams = useSearchParams()

    

    const inputRef = useRef<HTMLInputElement>(null)
    const inputRef2 = useRef<HTMLInputElement>(null)

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const field = e.target

        // if no value clear query

        // filtering is difficult, maybe an apart action?

        const newSearch = new URLSearchParams(searchParams.toString())
        newSearch.set(field.name, field.value )
        

        router.replace(`?${newSearch}`)
    }

    return (
        <div>
            <h1>Filter</h1>
            <form>
                <input
                    className=''
                    id='make'
                    name='make'
                    placeholder='make'
                    ref={inputRef}
                    onChange={handleChange}
                    >
                </input>
                <input
                    className=''
                    id='model'
                    name='model'
                    placeholder='model'
                    ref={inputRef2}
                    onChange={handleChange}>
                </input>
                <input
                    className=''
                    id='pieces'
                    name='pieces'
                    placeholder='pieces'
                    ref={inputRef2}
                    onChange={handleChange}>
                </input>
                <input
                    className=''
                    id='width'
                    name='width'
                    placeholder='width'
                    ref={inputRef2}
                    onChange={handleChange}>
                </input>
                <input
                    className=''
                    id='height'
                    name='height'
                    placeholder='height'
                    ref={inputRef2}
                    onChange={handleChange}>
                </input>
                <input
                    className=''
                    id='forAge'
                    name='forAge'
                    placeholder='forAge'
                    ref={inputRef2}
                    onChange={handleChange}>
                </input>
                <input
                    className=''
                    id='releaseYear'
                    name='releaseYear'
                    placeholder='releaseYear'
                    ref={inputRef2}
                    onChange={handleChange}>
                </input>
                <input
                    className=''
                    id='price'
                    name='price'
                    placeholder='price'
                    ref={inputRef2}
                    onChange={handleChange}>
                </input>
                <input
                    className=''
                    id='isOnSale'
                    name='isOnSale'
                    placeholder='isOnSale'
                    ref={inputRef2}
                    onChange={handleChange}>
                </input>
                <button>filter vagy link</button>
            </form>
        </div>
    )
}

export default FilterComponent