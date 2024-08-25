import Image from "next/image"

import style from './notfound.module.scss'

const NotFound = () => {
    return (
        <main className={style.notfound} id='notfound'>
            <Image
                className={style.img}
                src='/missing.webp'
                alt='missing piece'
                priority
                width='300'
                height='200'
            />
            <div>
                <h1 className={style.heading}>Ooops,</h1>
                <p className={style.desc}>
                    Looks like the piece you are looking for is missing!
                </p>
            </div>
        </main>
    )
}

export default NotFound