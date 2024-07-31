'use client'

import { useRouter } from "next/navigation"

import { useRef, useEffect } from "react"

import style from './style/imageModal.module.scss'

const Modal = ({ children }: { children: React.ReactNode }) => {
  
    const overlay = useRef<HTMLDialogElement>(null)
    const router = useRouter()

    // For safari dialog is open, throws error, must close first
    useEffect(() => {
        overlay.current?.showModal()
        return () => overlay.current?.close()
    })

    // Handle closure, because of the above safari complication 
    const handleClose = () => {
        overlay.current?.close()
        router.back()
    }

    return (
        <dialog
            id='modal'
            ref={overlay}
            className={style.imgModal}
            onClick={handleClose}
            onCancel={handleClose}
            >
            {children}
        </dialog>
    )
}

export default Modal