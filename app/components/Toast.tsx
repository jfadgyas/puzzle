'use client'

import Link from 'next/link'

import { useEffect } from 'react'

import Icon from '@mdi/react';
import {
    mdilCart,
    mdilPlus
} from '@mdi/light-js';

import storeToast from '../_actions/storeToast';

import style from './style/toast.module.scss'

const Toast = () => {

    let storedToasts

    // Check if we have access to localStorage
    if (typeof window !== 'undefined') {
        storedToasts = localStorage.getItem('toasts')
    }
    
    const list = storedToasts ? JSON.parse(storedToasts) : []

    // Automatically remove toasts after 2.5 sec
    useEffect(() => {
        const autoClose = setInterval(() => {
            if (list.length){
                list.shift()
                localStorage.setItem('toasts', JSON.stringify(list))
                storeToast()
            }
        }, 2500)

        return () => clearInterval(autoClose)
    }, [list])

    // Delete toast item
    const handleClick = (index: number) => {
        const newList = list.toSpliced(index, 1)
        // const newList = list.filter((item, idx) => idx!==index) // for IOS safari < 16
        localStorage.setItem('toasts', JSON.stringify(newList))
        storeToast()
    }

    return (
        <div className={style.container}>
            {
                list.map((item: string, index: number) => 
                    <div className={style.toast} key={index}>
                        <button
                            className={style.button}
                            onClick={() => handleClick(index)}
                            >
                            <Icon className={style.icon} path={mdilPlus} rotate={45}/>
                        </button>
                        <div className={style.message}>
                            <Icon className={style.icon} path={mdilCart} />
                            <p className={style.title}>Great!</p>          
                            <p className={style.desc}>
                                The item is added to your <Link className={style.link} href='/cart'>cart</Link>
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Toast