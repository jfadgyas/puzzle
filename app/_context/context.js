'use client'

import { createContext, useState } from "react";

export const StoreContext = createContext()

const StoreProvider = ({children, currentCookies}) => {

    const getCookie = which => {
        const cookie = currentCookies.find(item => item.name === which)
        return cookie ? JSON.parse(cookie.value) : null 
    }

    const [cart, setCart] = useState(getCookie('cart') || [])
    const [shipping, setShipping] = useState(getCookie('shipping') || {index: 0, code: null, country: null, cost: 0})

    return (
        <StoreContext.Provider value={{cart, setCart, shipping, setShipping}}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider