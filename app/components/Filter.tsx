'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { ChangeEvent, MouseEvent } from "react"

import Icon from '@mdi/react'
import {
    mdilChevronDown,
} from '@mdi/light-js';

import style from './style/filter.module.scss'

const Filter = ({brands, tags}: {brands: string[], tags: string[]}) => {

    const router = useRouter()
    const searchParams = useSearchParams()
    
    const filterCategories: Record<string, any> = {
        make: brands, //make
        pieces: ['2-50', '51-100', '101-500', '501-1000', '1001-100000'],
        tags: tags,
        age: ['0-5', '6-10', '11-18', '19-100'],
        price: ['0-10', '11-20', '21-30', '31-40', '41-100'],

    }

    // Generate filters
    const getFilters = (which: string) => filterCategories[which].map((item: string) => 
        <label className={style.values} key={item}>
            <input
                className=''
                id={`${which}${item}`}
                name={which}
                type='checkbox'
                value={item}
                onChange={handleChange}
                >
            </input>
            {item}
        </label>
    )

    // Toggle accordion open-closed state
    const handleClick = (e: MouseEvent<HTMLLegendElement, globalThis.MouseEvent>) => {
        const currentAccordion = e.currentTarget.parentElement
        const isHidden = currentAccordion?.getAttribute('aria-hidden')
        currentAccordion?.setAttribute('aria-hidden', isHidden === 'true' ? 'false' : 'true')
    }

    // Push selection value to URL when clicked
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const field = e.target

        const newSearch = new URLSearchParams(searchParams)     
        
        if (field.checked){
            newSearch.append(field.name, field.value)
        }
        else{
            newSearch.delete(field.name, field. value)
        }        

        router.replace(`?${newSearch}`, {scroll: false})
    }

    return (
        <section id='filter'>
            <h1>Filter</h1>
            <form>
                <fieldset className={style.fieldset} aria-hidden='true'>
                    <legend className={style.title} onClick={handleClick}>Brands<Icon className={style.icon} path={mdilChevronDown} /></legend>
                    <div className={style.accordion}>
                        {getFilters('make')}
                    </div>
                </fieldset>
                <fieldset className={style.fieldset} aria-hidden='true'>
                    <legend className={style.title} onClick={handleClick}>Pieces<Icon className={style.icon} path={mdilChevronDown} /></legend>
                    <div className={style.accordion}>
                        {getFilters('pieces')}
                    </div>
                </fieldset>

                <fieldset className={style.fieldset} aria-hidden='true'>
                    <legend className={style.title} onClick={handleClick}>Categories<Icon className={style.icon} path={mdilChevronDown} /></legend>
                    <div className={style.accordion}>
                        {getFilters('tags')}
                    </div>
                </fieldset>

                <fieldset className={style.fieldset} aria-hidden='true'>
                    <legend className={style.title} onClick={handleClick}>Age<Icon className={style.icon} path={mdilChevronDown} /></legend>
                    <div className={style.accordion}>
                        {getFilters('age')}
                    </div>                    
                </fieldset>

                <fieldset className={style.fieldset} aria-hidden='true'>
                    <legend className={style.title} onClick={handleClick}>Price<Icon className={style.icon} path={mdilChevronDown} /></legend>
                    <div className={style.accordion}>
                        {getFilters('price')}
                    </div>
                </fieldset>

                <fieldset className={style.fieldset} aria-hidden='true'>
                    <legend className={style.title} onClick={handleClick}>Sale<Icon className={style.icon} path={mdilChevronDown} /></legend>
                    <div className={style.accordion}>
                        <label>
                            <input
                                className=''
                                id='isOnSale'
                                name='isOnSale'
                                type='checkbox'
                                value='true'
                                onChange={handleChange}>
                            </input>
                            On Sale
                        </label>
                    </div>
                </fieldset>
            </form>
        </section>
    )
}

export default Filter