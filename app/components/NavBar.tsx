import {
    mdilHome,
    mdilTag,
    mdilViewModule,
    mdilInformation,
    mdilEmail,
    mdilAccount
} from '@mdi/light-js';
import {
    mdiNewBox,
    mdiPercentOutline
} from '@mdi/js';

import Menu from "./Menu";
import CartComponent from "./CartComponent"
import Hamburger from './Hamburger';

import style from './style/navbar.module.scss'

const NavBar = () => {

    const menuItems = [
        {
            name: 'home',
            puzzleIcon: 'menuitem',
            icon: mdilHome,
            link: '/',
        },
        {
            name: 'shop',
            icon: 'shop',
            link: '/',
            // submenu: [ // no submenus at the moment
            //     {
            //         name: 'categories',
            //         icon: '',
            //         link: '/',
            //     },
            //     {
            //         name: 'New arrivals',
            //         icon: '',
            //         link: '/',
            //     },
            //     {
            //         name: 'Best Sellers',
            //         icon: '',
            //         link: '/',
            //     },
            //     {
            //         name: 'On Sale',
            //         icon: '',
            //         link: '/',
            //     },
            //     {
            //         name: 'back',
            //         icon: '',
            //         link: 'home',
            //     },
            // ]
        },
        {
            name: 'categories',
            icon: mdilTag,
            link: '/',
        },
        {
            name: 'New', // 'arrivals',
            icon: mdiNewBox,
            link: '/',
        },
        // {
        //     name: 'Best Sellers',
        //     icon: '',
        //     link: '/',
        // },
        {
            name: 'On Sale',
            icon: mdiPercentOutline,
            link: '/',
        },
        {
            name: 'collections',
            icon: mdilViewModule, //mdilTag,
            link: '/',
        },
        // {
        //     name: 'blog/news',
        //     icon: '',
        //     link: '/',
        // },
        {
            name: 'about',
            icon: mdilInformation,
            link: '/',
        },
        {
            name: 'contact',
            icon: mdilEmail,
            link: '/contact',
        },
        {
            name: 'account',
            icon: mdilAccount,
            link: '/',
        },
    ]

    const showMenu = menuItems.map(item => <Menu key={item.name} menuItem={item} sub={false}/>)

    return (
        <>
            <nav className={style.nav}>
                <Hamburger />
                <ul id='navList' className={style.navList}>
                    {showMenu}
                    <li className={style.navItem}>
                        <div className={style.link}>
                            <CartComponent />
                        </div>
                    </li>
                </ul>
            </nav>
            <div className='headContainer'>
                <h1 className='header3'>Puzzle Plaza</h1>
            </div>
        </>
    )
}

export default NavBar