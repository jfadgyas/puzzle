'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { ChangeEvent } from "react"

import style from './style/select.module.scss'

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
        <div className={style.customSelect}>
            <select className={style.select} defaultValue='' onChange={handleChange}>
                <option className={style.option} disabled value=''>Sort options</option>
                <option className={style.option} data-name='price' value='1'>Price ascending</option>
                <option className={style.option} data-name='price' value='-1'>Price descending</option>
                <option className={style.option} data-name='pieces' value='1'>Pieces ascending</option>
                <option className={style.option} data-name='pieces' value='-1'>Pieces descending</option>
                <option className={style.option} data-name='make' value='1'>Brands ascending</option>
                <option className={style.option} data-name='make' value='-1'>Brands descending</option>
                <option className={style.option} data-name='model' value='1'>Model ascending</option>
                <option className={style.option} data-name='model' value='-1'>Model descending</option>
                {/*newest, popular, review?*/}
            </select>
        </div>
    )
}

export default Sort