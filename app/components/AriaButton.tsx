'use client'

import { MouseEvent } from 'react'

import style from './style/ariaButton.module.scss'

const AriaButton = ({ariaId, className, children}: {ariaId: string, className?: string, children: React.ReactNode}) => {
    
    const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        // const currentAccordion = e.currentTarget.parentElement
        // const isHidden = currentAccordion?.getAttribute('aria-hidden')
        // currentAccordion?.setAttribute('aria-hidden', isHidden === 'true' ? 'false' : 'true')
        const currentAccordion = document.querySelector(ariaId)
        const isHidden = currentAccordion?.getAttribute('aria-hidden')
        currentAccordion?.setAttribute('aria-hidden', isHidden === 'true' ? 'false' : 'true')
    }
    
    return (
        <button
            className={`${style.btn} ${className}`}
            type='button'
            aria-expanded='true'
            aria-controls={ariaId}
            onClick={handleClick}
            >
            {children}
        </button>
    )
}

export default AriaButton