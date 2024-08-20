import Link from "next/link"
import { Metadata } from "next";

import Icon from '@mdi/react'
import {
    mdilChevronDown,
} from '@mdi/light-js';

import AriaButton from './AriaButton'
import { faq } from "@/app/models/faq"

import style from './faq.module.scss'

export const metadata: Metadata = {
    title: "Frequently Asked Questions – Puzzle Plaza Help Center",
    description: "Find answers to your questions",
  };

const FaqPage = () => {

    const getQuestions = (cat: Record<string, any>) => {
        return cat.questions.map((question: Record<string, any>) => 
            <li className={style.questionItem} key={question.question}>
                <p className={style.question}>{question.question}</p>
                <p className={style.answer}>{question.answer}</p>
            </li>
        )
    }

    const showFaq = faq.map(category =>
        <li
            className={style.catItem}
            key={category.category}
            aria-hidden='true'
            >
            <AriaButton>
                <h2 className={style.title} id='panel1-title'>
                    <span>{category.category}</span>
                    <Icon className={style.icon} path={mdilChevronDown} />
                </h2>
            </AriaButton>
            <div className={style.accordion}
                id='panel1-content'
                role="region"
                aria-labelledby="panel1-title"
                >
                <ul className={style.list}>
                    {getQuestions(category)}
                </ul>
            </div>
        </li>
    )

    return (
        <main className={style.faq} id='faq'>
            <h1 className={style.header}>frequently asked questions</h1>
            {/* <p>search</p> */}
            <p>Below you will find answers to the most common questions you may have on our site. If you still can't find the answer you are looking for, just <Link className={style.link} href='/contact'>Contact us!</Link></p>
            <ul className={style.list}>
                {showFaq}
            </ul>
        </main>
    )
}

export default FaqPage