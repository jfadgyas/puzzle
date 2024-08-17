'use client'

import Image from "next/image"

import { useEffect, useContext } from "react"
import { StoreContext } from "../_context/context"

import Icon from "@mdi/react"
import { mdiPuzzleOutline } from "@mdi/js"
import {
    mdilDelete,
    mdilCurrencyEur
} from "@mdi/light-js"

import Quantity from "../components/Quantity"
import CheckoutButton from "../components/CheckoutButton"
import Shipping from "../components/Shipping"
import { shippingCosts } from "../models/shipping"

import style from './cart.module.scss'

const CartPage = () => {

    const {cart, setCart, shipping, setShipping} = useContext(StoreContext)
    let disabledCheckout = false
    let total: number = shipping.cost // To hold card total
    
    // Initial calculation of shipping
    useEffect(() => {
        getShipping()
    }, [cart])

    // Get shipping cost // needs more thinking
    const getShipping = (index?: number) => {
        const cartItemsCount = cart.reduce((total: number, item: Record<string, any>) => {
            return total += item.qty
        }, 0)
        const rateIndex = index !== undefined ? index : shipping.index
        const newShipping = {
            index: rateIndex,
            code: shippingCosts.rates[rateIndex].code,
            country: shippingCosts.rates[rateIndex].country,
            cost: cartItemsCount < 2 ? shippingCosts.rates[rateIndex].max1kg : shippingCosts.rates[rateIndex].to10kg
        }
        setShipping(newShipping)
    }

    // Get qty value from input field
    const emitValue = (qty: number, index: number) => {
        const newCart = [...cart]
        newCart[index].qty = qty
        setCart(newCart)
        getShipping()
    }

    // Get index of counrty
    const emitShipping = (index: number) => {
        getShipping(index) 
    }

    // Generate cart items
    const cartItems = cart.map((item: Record<string, any>, index: number) => {
        total += item.qty * item.product.price
        if (item.qty > item.product.stock) disabledCheckout = true
        return <li
            className={style.cartProductItem}
            key={item.product._id}>
            <Image
                className={style.picture}
                src={item.product.pic[0]}
                width={100}
                height={75}
                alt='doboz'
            />
            
            <span className={style.model}>{item.product.model}</span>
            <div className={style.pieces}>
                <Icon
                    className={style.icon}
                    path={mdiPuzzleOutline}
                />
                <span>{item.product.pieces}</span>
            </div>
            
            <div className={style.qty}>
                <Quantity
                    stock={item.product.stock}
                    currentQty={item.qty}
                    index={index}
                    emitValue={emitValue}
                />
            </div>

            <span className={style.subtotal}>
                <Icon
                    className={style.icon}
                    path={mdilCurrencyEur}
                />
                <span>{(item.product.price * item.qty).toFixed(2)}</span>
            </span>

            <button
                className={style.removeBtn}
                onClick={() => setCart([...cart].toSpliced(index, 1))}>
                <Icon
                    className=''
                    path={mdilDelete}
                    size={1}
                />
            </button>
        </li>
    })

    return (
        <section id='CartPage'>
            <ul className={style.cartProductList}>
                {cartItems}
            </ul>

            <div className={style.total}>
                <span>Shipping to <Shipping shipping={shipping} emitShipping={emitShipping}/></span>
                
                <span className={style.totalAmount}>
                    <Icon
                        className={style.icon}
                        path={mdilCurrencyEur}
                        size={1}
                    />
                    {shipping.cost.toFixed(2)}
                </span>
                <span>Total:</span>
                <span className={style.totalAmount}>
                    <Icon
                        className={style.icon}
                        path={mdilCurrencyEur}
                        size={1}
                    />
                    {(total).toFixed(2)}
                </span>
            </div>
            <CheckoutButton isDisabled={disabledCheckout}/>
        </section>
    )
}

export default CartPage