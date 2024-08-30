'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { ChangeEvent } from "react"

const Sort = () => {

    const router = useRouter()
    const searchParams = useSearchParams()

    // Generate options

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        
        const selected = e.target.options.selectedIndex
        const field = e.target.options[selected].dataset.name!
        const value = e.target.value
        
        const newSearch = new URLSearchParams(searchParams)
        newSearch.set('sort', JSON.stringify({[field]: +value}))

        router.replace(`?${newSearch}`, {scroll: false})
    }

    return (
        <select onChange={handleChange}>
            <option value='0'>Sort option</option>
            <option data-name='price' value='1'>price up</option>
            <option data-name='price' value='-1'>price down</option>
            <option data-name='pieces' value='1'>pieces up</option>
            <option data-name='pieces' value='-1'>pieces down</option>
            <option data-name='model' value='1'>model up</option>
            <option data-name='model' value='-1'>model down</option>
        </select>
    )
}

export default Sort