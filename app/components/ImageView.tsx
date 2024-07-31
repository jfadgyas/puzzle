'use client'

import Link from "next/link"
import Image from "next/image"

import { useState } from "react"
import { usePathname } from "next/navigation"

import style from './style/imageview.module.scss'

const ImageView = ({pictures}: {pictures: string[]}) => {

    const path = usePathname()
    const [main, setMain] = useState(0)

    // Create images for selection
    const showImages = pictures.map((item, index) => 
        <Image
            key={index}
            className={style.pic}
            src={item}
            width={300}
            height={200}
            alt='gallery'
            onClick={() => setMain(index)}
        />
    )

    return (
        <div id='images' className={style.imgWrapper}>
            <Link
                className={style.mainWrapper}
                href={`${path}${pictures[main]}`}>
                <Image
                    className={style.pic}
                    src={pictures[main]}
                    width={640}
                    height={480}
                    alt='main picture'
                    sizes="(min-width: 1000px) 550px, (min-width: 540px) calc(33.41vw - 16px), (min-width: 380px) calc(6.43vw + 124px), calc(100vw - 32px)"
                />
            </Link>
            <div className={style.moreWrapper}>
                {showImages}
            </div>            
        </div>
    )
}

export default ImageView