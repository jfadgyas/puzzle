'use client'

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react'

import Icon from '@mdi/react'
import {
    // mdilMinus,
    mdilPlus,
    mdilHamburger
} from '@mdi/light-js';

import style from './style/hamburger.module.scss'
import menuStyle from './style/navbar.module.scss'

const Hamburger = () => {
    
    const [isOpen, setIsOpen] = useState(false)

    // Handle closure of the menu after clicking an item.
    // Currently there is no easier solution
    const path = usePathname()
    
    useEffect(() => {
        setIsOpen(false)
        const navBar = document.querySelector('#navList')
        navBar?.classList.remove(`${menuStyle['navList--open']}`)
    }, [path])
    
    // Handle open / close state of the menu on mobile    
    const handleClick = () => {
        setIsOpen(!isOpen) // maybe set icon props and pass ...iconprops?
        const navBar = document.querySelector('#navList')
        navBar?.classList.toggle(`${menuStyle['navList--open']}`)
    }

    return (
        <button className={isOpen ? `${style['hamburger']} ${style['hamburger--open']}`: style.hamburger} onClick={() => handleClick()}>
            <Icon
                className={style.icon}
                path={isOpen ? mdilPlus : mdilHamburger}
                size={1}
                rotate={isOpen ? 45 : 0}
            />
        </button>                
    )
}

export default Hamburger