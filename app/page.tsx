import dbConnect from "./lib/dbConnect"
import Filter from "./components/Filter"
import Sort from "./components/Sort"
import Products from '@/app/components/Products'

import Helpers from "./models/helpers"
import AriaButton from "./components/AriaButton"
import ExtIcon from './components/ExtIcon'

import style from './page.module.scss'

import getDb from "./_actions/getDb"

const MainPage = async ({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) => {
    
    // Get brands and categories for filters
    await dbConnect()    
    const helpers = await Helpers.findOne()

    return (
        <main id='start'>
            <div className={style.auxrow} id='auxrow'>
                <AriaButton ariaId={'#filter'} className={style.filterBtn}>
                    <ExtIcon className={style.filterIcon} path='filter'></ExtIcon>
                </AriaButton>
            <span>search</span>
                <Sort />
            </div>
            <Filter brands={helpers.brands} tags={helpers.tags} />
            <Products puzzles={await getDb(searchParams)} />
        </main>
    )
}

export default MainPage