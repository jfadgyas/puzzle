'use client'

import { useRouter } from "next/navigation"

import { useRef, useEffect } from "react"

import style from './style/imageModal.module.scss'

const ImageModal = ({ children }: { children: React.ReactNode }) => {
  
    const overlay = useRef<HTMLDialogElement>(null)
    const router = useRouter()

    useEffect(() => {
        overlay.current?.showModal()
    })

    return (
        <dialog
            id='bigpicture'
            ref={overlay}
            className={style.imgModal}
            onClick={() => overlay.current?.close()}
            onClose={() => router.back()}
            >
            {children}
        </dialog>
    )
}

export default ImageModal