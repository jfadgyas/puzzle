import Link from "next/link"

import ContactForm from "@/app/components/ContactForm"

import style from './support.module.scss'

const supportPage = () => {
    return (
        <main className={style.support}>
            <h1 className={style.header}>support</h1>
            <p className={style.desc}>
                If you need help, you can reach out to us 
                at <Link className={style.link} href='mailto:support@puzzleplaza.com'>support@puzzleplaza.com</Link> or call us 
                at <Link className={style.link} href='tel:+1234567890'>+1234567890</Link>.
            </p>
            <p className={style.desc}>
                For common questions, please check 
                our <br></br><Link className={style.link} href='/faq' target='_blank'>FAQ page</Link>.
            </p>
            <ContactForm />
        </main>
    )
}

export default supportPage