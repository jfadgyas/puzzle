import Link from "next/link"

// Temporary, need to use the same as contact form
import Icon from '@mdi/react';
import { 
    mdilAccount,
    mdilEmail,
    mdilPhone,
    mdilMapMarker,
    mdilBank
} from '@mdi/light-js'

import ContactForm from "@/app/components/ContactForm"

import style from './contact.module.scss'

const ContactPage = () => {
    return (
        <main className={style.contact}>
            <h1 className={style.header}>Contact Us</h1>
            <p className={style.desc}>If you have any questions or need further assistance, feel free to reach out to us using the information below:</p>
            <section className={style.infoSection}>
                <div className={style.infoWrapper}>
                    <Icon className={style.icon} path={mdilAccount} />
                    <span className={style.address}>Puzzle Plaza BV.</span>
                </div>
                <div className={style.infoWrapper}>
                    <Icon className={style.icon} path={mdilEmail} />
                    <Link className={style.link} href='mailto:support@puzzleplaza.com'>support@puzzleplaza.com</Link>
                </div>
                <div className={style.infoWrapper}>
                    <Icon className={style.icon} path={mdilPhone} />
                    <Link className={style.link} href='tel:+1234567890'>+1234567890</Link>
                </div>
                <div className={style.infoWrapper}>
                    <Icon className={style.icon} path={mdilMapMarker} />
                    <div>
                        <span className={style.address}>Puzzle Plaza BV.</span>
                        <span className={style.address}>Wasgijstraat 101</span>
                        <span className={style.address}>1012 AB, Amsterdam</span>
                        <span className={style.address}>Netherlands</span>
                    </div>
                </div>
                <div className={style.infoWrapper}>
                    <Icon className={style.icon} path={mdilBank} />
                    <p>KVK: 123456789</p>
                </div>
            </section>
            <ContactForm />
            <p>For common questions, please check our <br></br><Link className={style.link} href='/faq' target='_blank'>FAQ page</Link>.</p>
        </main>
    )
}

export default ContactPage