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
import AddToCart from '@/app/components/AddToCart'

import style from '../products/products.module.scss'

const Products = ({puzzles}: {puzzles: Record<string, any>[]}) => {

    const puzzleList = puzzles.map(item =>
        <li 
            key={item._id}
            className={style.productItem}>
            <Link
                className={style.link}
                href={`/products/${item._id}`}>
                
                <Image
                    src={item.pic[0]}
                    width={292}
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
        <section className={style.products} id='products'>
            <ul className={style.productList}>
                {puzzleList}
            </ul>
        </section>
    )
}

export default Products