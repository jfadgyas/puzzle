import Link from "next/link"
import { Metadata } from "next";

import Icon from '@mdi/react';
import { mdiPuzzle  } from '@mdi/js';
import {
    mdilTag,
    mdilCalendar,
    mdilViewModule,
    mdilCurrencyEur,
    mdilAccount,
} from '@mdi/light-js';

import AddToCart from "@/app/components/AddToCart"
import ExtIcon from "@/app/components/ExtIcon"
import ImageView from "@/app/components/ImageView"

import Puzzles from '@/app/models/puzzles'

import style from './product.module.scss'

export async function generateMetadata({params}: {params: {productId: string}}){
    
    const puzzleDb = await Puzzles.find()

    const puzzle: Record<string, any> | undefined = puzzleDb.find(item => item._id.toString() === params.productId)
    if(!puzzle) return
    
    return {
        title: `${puzzle.model} | Buy Now at Puzzle Plaza`,
        description: puzzle.description,
        openGraph: {
            title: `${puzzle.model} | Buy Now at Puzzle Plaza`,
            description: puzzle.description,
            siteName: 'Puzzle Plaza',
            type: 'website',
            url: `${process.env.BASEURL}/products/${params.productId}`,
            images: [{
                url: puzzle.pic[0],
                width: 1200,
                height: 630
            }]
        }
    }
  }

const PuzzlePage = async ({params}: {params: {productId: string}}) => {

    // should only pass single puzzle
    const puzzleDb = await Puzzles.find()

    const puzzle: Record<string, any> | undefined = puzzleDb.find(item => item._id.toString() === params.productId)
    if(!puzzle) return
    
    return (
        <main id='product' className={style.product}>
            <ImageView pictures={puzzle.pic} />
            
            <div className={style.main}>
                <h1 className={style.model}>{puzzle.model}</h1>
                <p className={style.pieces}>
                    <Icon path={mdiPuzzle} size={1} />
                    {puzzle.pieces} pcs
                </p>
                <p className={style.make}>By {puzzle.make}</p>
                <p>{puzzle.description}</p>
                <p>
                    <Icon path={mdilTag} size={1} />
                    {
                        puzzle.tags.map((item: string) => <Link className={style.link} key={item} href={`${process.env.BASEURL}?tags=${item}`}>{item}</Link>)
                    }
                </p>
            </div>

            <div className={style.data}>
                <div className={style.dimensions}>
                    <span className={style.width}>
                        <ExtIcon className={`${style['ruler']} ${style['ruler--width']}`} path='ruler' />
                        {puzzle.width}cm
                    </span>
                    <span className={style.height}>
                        <ExtIcon className={style.ruler} path='ruler' />
                        {puzzle.height}cm
                    </span>
                </div>

                <div className={style.minAge}>
                    <Icon path={mdilAccount} size={1} />
                    {puzzle.forAge}
                    <span className={style.explanation}>min age</span>
                </div>

                <div className={style.release}>
                    <Icon path={mdilCalendar} size={1} />
                    {puzzle.releaseYear}
                </div>

                <div className={style.stock}>
                    <Icon path={mdilViewModule} size={1} />
                    {puzzle.stock}
                    <span className={style.explanation}> stock</span>
                </div >

                {/* <div className={style.condition}>
                    <div className={style.conditionDots}></div>
                    <span>condition</span>
                </div> */}
            </div>

            <div className={style.financial}>
                <div className={puzzle.isOnSale ? `${style['priceContainer']} ${style['priceContainer--sale']}` : style.priceContainer}>
                    <span className={style.price}>
                        <Icon className={style.priceIcon} path={mdilCurrencyEur} />
                        {puzzle.originalPrice?.toFixed(2)}
                    </span>
                    <span className={style.price}>
                        <Icon className={style.priceIcon} path={mdilCurrencyEur} />
                        {puzzle.price.toFixed(2)}
                    </span>
                </div>
                
                <AddToCart puzzle={JSON.parse(JSON.stringify(puzzle))}/>

            </div>

            {/* <span>{puzzle.exchange}</span> */}
            {/* <span>seller</span> */}            

            <h2>featured/similar</h2>
        </main>
    )
}

export default PuzzlePage