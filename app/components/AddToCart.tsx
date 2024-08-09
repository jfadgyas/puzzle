'use client'

import { useState, useContext } from "react"

import {StoreContext} from '@/app/_context/context.js'

import Icon from '@mdi/react';
import {
    mdilCart,
    mdilCheck
} from '@mdi/light-js';

import Quantity from "./Quantity"
import storeToast from "../_actions/storeToast";

import style from './style/addtocart.module.scss'

const AddToCart = ({puzzle}: {puzzle: Record<string, any>}) => {

    const {cart, setCart} = useContext(StoreContext)
    const [currentQty, setCurrentQty] = useState(1)

    // Get quantity from qty component
    const emitValue = (qty: number) => {
        setCurrentQty(qty)
    }
    
    const isOnCart = cart.findIndex((item: Record<string, any>) => item.product._id === puzzle._id)
    
    const handleAdd = () => {
        
        const newCart = [...cart]

        // If the item is on the shopping cart increase qty, else put on the cart
        if (isOnCart !== -1){
            newCart[isOnCart].qty = newCart[isOnCart].qty + currentQty
        }
        else{
            newCart.push({product: puzzle, qty: currentQty})
        }       
        setCart(newCart)

        // Show toast
        // Server action cannot handle localStorage
        const storedToasts = localStorage.getItem('toasts')
        const list = storedToasts ? JSON.parse(storedToasts) : []
        localStorage.setItem('toasts', JSON.stringify([...list, puzzle._id.toString()]))
        storeToast()
    }

    return (
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
    )
}

export default AddToCart