'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { ChangeEvent } from "react"

import Icon from '@mdi/react'
import {
    mdilChevronDown,
} from '@mdi/light-js';

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
                <option className={style.option} data-name='price' value='1'>price ascending</option>
                <option className={style.option} data-name='price' value='-1'>price descending</option>
                <option className={style.option} data-name='pieces' value='1'>pieces ascending</option>
                <option className={style.option} data-name='pieces' value='-1'>pieces descending</option>
                <option className={style.option} data-name='make' value='1'>brands ascending</option>
                <option className={style.option} data-name='make' value='-1'>brands descending</option>
                <option className={style.option} data-name='model' value='1'>model ascending</option>
                <option className={style.option} data-name='model' value='-1'>model descending</option>
                {/*newest, popular, review?*/}
            </select>
            <Icon
                className={style.icon}
                path={mdilChevronDown}
            />
        </div>
    )
}

export default Sort