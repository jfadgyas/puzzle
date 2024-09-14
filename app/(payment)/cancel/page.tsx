import Link from 'next/link';
import { Metadata } from 'next';

import Icon from '@mdi/react'
import { mdilCancel } from '@mdi/light-js'

import style from './cancel.module.scss'

export const metadata: Metadata = {
    title: "Payment Unsuccessful – Try Again or Contact Support at Puzzle Plaza",
    description: "Created by Jcube 2024",
  };

const CancelPage = () => {

    return (
        <section className={style.error} id='cancel'>
            <Icon className={style.icon} path={mdilCancel} />
            <h1 className={style.result}>
                Payment Unsuccessful
            </h1>
            <p className={style.message}>We&apos;re sorry, but your payment could not be processed at this time.</p>
            <p>Please check your payment information and try again, or use a different payment method.</p>
            <p>If you continue to experience issues, please contact our customer support team.</p>
            <div className={style.actions}>
                <Link
                    className={style.link}
                    href='/cart'>Retry Payment
                </Link>
                <Link
                    className={style.link}
                    href='/contact'>Contact Support
                </Link>
                <Link
                    className={style.link}
                    href='/'>Return to Home
                </Link>
            </div>
        </section>
    )
}

export default CancelPage