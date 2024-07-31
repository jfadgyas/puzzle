import Link from 'next/link'

import style from './style/cartModal.module.scss'

const CartModal = () => {
    
    // open?

    return (
        <dialog className={style.cartModal} open={false}>
            <p>Great! The item is added to your <Link className={style.link} href='/cart'>cart!</Link></p>
        </dialog>
    )
}

export default CartModal