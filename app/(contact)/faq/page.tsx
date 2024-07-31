import Link from "next/link"

import { faq } from "@/app/models/faq"

import style from './faq.module.scss'

const FaqPage = () => {

    const getQuestions = (cat: Record<string, any>) => {
        return cat.questions.map((question: Record<string, any>) => 
            <li className='listItem'>
                <p>{question.question}</p>
                <p>{question.answer}</p>
            </li>
        )
    }

    const showFaq = faq.map(category => 
        <li className={`${style['listItem']} ${style['listItem--categories']}`}>
            {category.category}
            <ul className={style.list}>
                {getQuestions(category)}
            </ul>
        </li>
    )

    return (
        <main>
            <h1>frequently asked questions</h1>
            <p>search</p>
            <p>Below you will find answers to the most common questions you may have on our site. If you still can't find the answer you are looking for, just <Link href='/contact'>Contact us!</Link></p>
            <ul className={style.list}>
                {showFaq}
            </ul>
        </main>
    )
}

export default FaqPage