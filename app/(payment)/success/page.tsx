import Link from 'next/link';
import { Metadata } from 'next';

import Icon from '@mdi/react'
import { mdilCheck } from '@mdi/light-js'

import style from './success.module.scss'

export const metadata: Metadata = {
    title: "Payment Successful – Thank You for Shopping with Puzzle Plaza",
    description: "Created by Jcube 2024",
  };

const successPage = ({searchParams}: {searchParams: {session_id: string}}) => {

    return (
        <main className={style.success} id='success'>
            <Icon className={style.icon} path={mdilCheck}/>
            <h1 className={style.result}>
                Payment Successful
            </h1>
            <p className={style.mesage}>Thank you for your purchase! Your order will be processed soon.</p>
            <p className={style.mesage}>An email is sent to you with further information.</p>     
            <div className={style.actions}>
                <Link
                    className={style.link}
                    href={{
                        pathname: '/orders',
                        query: {session_id: searchParams.session_id}
                    }}>View Order Details
                </Link>
                <Link
                    className={style.link}
                    href='/'>Continue Shopping
                </Link>
            </div>  
            {/* <p>Further Enhancements: Consider adding additional features such as estimated delivery date, order tracking links, and customer support contact information. rate review</p> */}
        </main>
    )
}

export default successPage