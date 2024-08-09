import Link from 'next/link.js'
import Image from 'next/image'

import Icon from '@mdi/react';
import { mdiPuzzle  } from '@mdi/js';
import {    
    mdilCalendar,
    mdilTable,
    mdilCurrencyEur,
} from '@mdi/light-js';

import ExtIcon from '@/app/components/ExtIcon'
import FilterComponent from '../components/FilterComponent'
import AddToCart from '@/app/components/AddToCart'

import Puzzles from '../models/puzzles'

import style from './products.module.scss'

const ProductsPage = async ({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) => {

    const puzzleDb = await Puzzles.find()

    const puzzleList = puzzleDb
        // .filter(item => 
        //     item.make.includes(searchParams.make || '') &&
        //     item.model.includes(searchParams.model || '')
        // )
        .map(item =>
        <li 
            key={item._id}
            className={style.productItem}>
            <Link
                className={style.link}
                href={`/products/${item._id}`}>
                
                <Image
                    src={item.pic[0]}
                    width={256}
                    height={192}
                    alt='doboz'
                />
                
                <h3 className={style.model}>{item.model}</h3>
                <div className={style.pieces}>
                    <Icon path={mdiPuzzle} size={1} />
                    <span>{item.pieces}</span>
                    <span className={style.explanation}>pieces</span>
                </div>
                <div className={style.container}>
                    <div className={style.minAge}>                        
                        <ExtIcon className={style.extIcon} path='agealt' />                        
                        <span>{item.forAge}</span>
                        <span className={style.explanation}> min age</span>
                    </div>
                    <div className={style.release}>
                        <Icon path={mdilCalendar} size={1} />
                        <span>{item.releaseYear}</span>
                    </div>
                    <div className={style.release}>
                        <Icon path={mdilTable} size={1} />
                        <span>{item.stock}</span>
                        <span className={style.explanation}> stock</span>
                    </div>
                </div>             

                <div className={item.isOnSale ? `${style['priceContainer']} ${style['priceContainer--sale']}` : style.priceContainer}>
                    <span className={style.price}>
                        <Icon className={style.priceIcon} path={mdilCurrencyEur} />
                        {item.originalPrice?.toFixed(2)}
                    </span>
                    <span className={style.price}>
                        <Icon className={style.priceIcon} path={mdilCurrencyEur} />
                        {item.price.toFixed(2)}
                    </span>
                </div>
            </Link>
            <AddToCart puzzle={JSON.parse(JSON.stringify(item))} />
        </li>
    )

    return (
        <section id='products'>            
            <h1 className=''>All products</h1>
            {/* <FilterComponent /> */}
            <ul className={style.productList}>
                {puzzleList}
            </ul>
        </section>
    )
}

export default ProductsPage