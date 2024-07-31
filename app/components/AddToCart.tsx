'use client'

import { useState, useContext } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import {StoreContext} from '@/app/_context/context.js'

import Icon from '@mdi/react';
import {
    mdilCart,
    mdilCheck
} from '@mdi/light-js';

import Quantity from "./Quantity"
// import Modal from "./Modal"

import style from './style/addtocart.module.scss'

const AddToCart = ({puzzle}: {puzzle: Record<string, any>}) => {

    const {cart, setCart} = useContext(StoreContext)
    const [currentQty, setCurrentQty] = useState(1)
    
    const router = useRouter()
    // const search = useSearchParams()

    const emitValue = (qty: number) => {
        setCurrentQty(qty)
    }
    
    const isOnCart = cart.findIndex((item: Record<string, any>) => item.product._id === puzzle._id)
    
    const handleAdd = () => {
        
        // Check if qty is a number > 0
        // if (isNaN(inputRef.current?.valueAsNumber!) || inputRef.current?.valueAsNumber! <= 0) return console.log('nem lehet<0')
        
        const newCart = [...cart]

        // If the item is on the shopping cart increase qty, else put on the cart
        if (isOnCart !== -1){
            newCart[isOnCart].qty = newCart[isOnCart].qty + currentQty
        }
        else{
            newCart.push({product: puzzle, qty: currentQty})
        }       
        setCart(newCart)
        router.push('?modal=true')
    }

    return (
        <>
        <div className={style.addWrapper}>            
            <Quantity stock={puzzle.stock} currentQty={1} index={-1} emitValue={emitValue}/>
            <button
                className={`${style['button']} ${style['button--action']}`}
                onClick={() => handleAdd()}
                >
                <Icon path={isOnCart === -1 ? mdilCart : mdilCheck} size={1} />
                <span>Add {isOnCart === -1 ? ' to cart' : ' more'}</span>
            </button>
        </div>
        {/* {search.has('modal') && 
            <Modal>
                <p>i son cart</p>
            </Modal>
        } */}
        </>
    )
}

export default AddToCart