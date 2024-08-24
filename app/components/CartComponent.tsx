'use client'

import Link from "next/link";

import { useContext } from "react"
import { StoreContext } from "../_context/context"

import Icon from '@mdi/react';
import {
    mdilCart
} from '@mdi/light-js';

import style from '@/app/components/style/cartcomponent.module.scss'

const CartComponent = () => {

    const {cart} = useContext(StoreContext)

    const cartItemsCount = cart.reduce((total: number, item: Record<string, any>) => {
        return total += item.qty
    }, 0)

    return (
        <Link
            className={`${style.link} ${style.cart}`}
            href='/cart'>
            <Icon path={mdilCart} size={1} />
            <span className={style.counter}>
                {cartItemsCount}
            </span>
        </Link>
    )
}

export default CartComponent