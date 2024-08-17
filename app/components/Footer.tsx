import Link from 'next/link';

import Icon from '@mdi/react'
import {
    mdiFacebook,
    mdiYoutube,
    mdiInstagram
} from '@mdi/js';

import style from './style/footer.module.scss'

const Footer = () => {
    
    return (
        <footer className={style.footer}>
            <div>
                <h3 className={style.header}>About Puzzle Plaza</h3>
                <p>Puzzle Plaza is your go-to online store for a wide variety of puzzles and jigsaw puzzles. Our mission is to bring joy and challenge to puzzle enthusiasts of all ages.</p>
            </div>
            <div>
                <h3 className={style.header}>Quick Links</h3>
                <ul className={style.linkList}>
                    <li>
                        <Link
                            className={style.link}
                            href="/">Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={style.link}
                            href="/shop">Shop
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={style.link}
                            href="/faq">FAQ
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={style.link}
                            href="/contact">Contact Us
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <h3 className={style.header}>Follow Us</h3>
                <div className={style.socialIcons}>
                    <a
                        className={style.link}
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <Icon className={style.icon} path={mdiFacebook} />
                    </a>
                    <a
                        className={style.link}
                        href="https://www.youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <Icon className={style.icon} path={mdiYoutube} />
                    </a>
                    <a
                        className={style.link}
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <Icon className={style.icon} path={mdiInstagram} />
                    </a>
                </div>
            </div>
            <div>
                <h3 className={style.header}>Contact Us</h3>
                <div>
                    <span className={style.contactTitle}>Address:</span><br />
                    Puzzle Plaza<br />
                    123 Puzzle Street<br />
                    1012 AB, Amsterdam<br />
                    Netherlands
                </div>
                <div>
                    <span className={style.contactTitle}>Email: </span>
                    <a
                        className={style.link}
                        href="mailto:support@puzzleplaza.com">support@puzzleplaza.com
                    </a>
                </div>
                <div>
                    <span className={style.contactTitle}>Phone: </span>
                    <a
                        className={style.link}
                        href="tel:+31234567890">+31 23 456 7890
                    </a>
                </div>
            </div>
            <div className={style.copyright}>
                <p>&copy; 2024 Puzzle Plaza. All rights reserved.</p>
            </div>
        </footer>    
    )
}

export default Footer