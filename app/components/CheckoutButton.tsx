'use client'

import { useRouter } from "next/navigation"

import { useContext } from "react"

import Icon from "@mdi/react"
import { mdilCreditCard } from "@mdi/light-js"

import { StoreContext } from "../_context/context"
import payment from "../_actions/payment"

import style from './style/checkoutbutton.module.scss'

const CheckoutButton = ({isDisabled}: {isDisabled: boolean}) => {

    const router = useRouter()
    const {cart, shipping} = useContext(StoreContext)

    // Redirect to stripe page if the creation of checkout is successfull
    const handleClick = async () => {
        const url = await payment(cart, shipping)
        url && router.push(url)
        // if no url throw error?   
    }

    return (
        <button
            className={style.checkoutBtn}
            disabled={isDisabled || cart.length === 0}
            onClick={() => handleClick()}
            >
                <Icon className={style.icon} path={mdilCreditCard}/>
                <span className={style.text}>Checkout{isDisabled && ' not possible'}</span>
        </button>
    )
}

export default CheckoutButton