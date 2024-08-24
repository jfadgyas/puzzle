import { Metadata } from "next"
import Image from "next/image";

export const metadata: Metadata = {
    title: "About Puzzle Plaza – Our Mission & Story",
    description: "Created by Jcube 2024",
  };

import style from './about.module.scss'

const About = () => {
    return (
        <main className={style.about} id='about'>
            <section className={style.hero} id='hero'>
                <h1 className={style.title}>Welcome to Puzzle Plaza!</h1>
                <p className={style.subtitle}>
                    Bringing Joy and Challenge to Puzzle Enthusiasts Since 2024
                </p>
                <p className={style.desc}>
                    We are passionate puzzle enthusiasts who have spent countless hours solving jigsaws of all shapes and sizes. This year, we decided to take our passion to the next level by creating **Puzzle Plaza**, an online store dedicated to providing high-quality puzzles to fellow enthusiasts around the world.
                </p>
            </section>
            
            <section className={style.content} id='journey'>
                <div className={style.textSection}>
                    <h2 className={style.heading}>Our Journey</h2>
                    <p className={style.desc}>
                        Our love for jigsaw puzzles began as a hobby, but it quickly grew into something much more. Whether it was the joy of finding that perfect piece or the satisfaction of completing a challenging puzzle, we knew that puzzles were more than just a pastime – they were a source of fun, relaxation, and mental stimulation.

                        That&apos;s why, in **2024**, we founded Puzzle Plaza. We wanted to share our passion with the world and offer a curated selection of puzzles for all skill levels – from beginners to advanced puzzlers.

                    </p>
                </div>
                <div className={style.imageSection}>
                    <Image
                        className={style.image}
                        src='/boxes.jpg'
                        alt='boxes'
                        width='150'
                        height='150'
                    />
                </div>
            </section>

            <section className={style.mission} id='mission'>
                <h2 className={style.heading}>Our Mission</h2>
                <p className={style.desc}>
                    At Puzzle Plaza, our mission is simple:  
                    To bring the joy of puzzles to everyone, one piece at a time.

                    We believe that jigsaw puzzles are not just for fun but also a way to unwind, challenge your mind, and even bond with family and friends. That&apos;s why we are committed to offering a wide variety of puzzles, from beautiful landscapes and intricate designs to fun and educational themes for kids.

                </p>
            </section>

            <section className={style.content} id='whyus'>
                <h2 className={style.heading}>Why Puzzle Plaza?</h2>
                <ul className={style.whyUs}>
                    <li className={style.why}>
                        <span className={style.thatsWhy}>Passion-Driven:</span>
                        <span>We are puzzle lovers just like you, and we handpick every puzzle in our collection with care.</span>

                    </li>
                    <li className={style.why}>
                        <span className={style.thatsWhy}>Quality First:</span>
                        <span>We prioritize high-quality puzzles that ensure a satisfying and enjoyable experience, with pieces that fit perfectly.</span>

                    </li>
                    <li className={style.why}>
                        <span className={style.thatsWhy}>Customer-Centric:</span>
                        <span>Whether you&apos;re just starting out or are a seasoned puzzler, we&apos;re here to help you find the perfect puzzle.</span>
                    </li>
                </ul>
            </section>

            <section className={style.content} id='join'>
                <h2 className={style.heading}>Join the Puzzle Plaza Community</h2>
                <p className={style.desc}>
                    We&apos;re more than just a store – we&apos;re building a community of puzzle lovers who share our excitement and passion. Whether you&apos;re looking for your next challenge or a gift for a fellow puzzle enthusiast, we’re here to inspire and support you on your puzzling journey.

                    Thank you for visiting **Puzzle Plaza**, and happy puzzling!
                </p>
            </section>
        </main>
    )
}

export default About