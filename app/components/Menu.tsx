// 'use client'

import Link from "next/link"
import Icon from '@mdi/react';

import ExtIcon from "./ExtIcon"

import style from './style/navbar.module.scss'

const Menu = ({menuItem, sub}: {
    menuItem: Record<string, any>,
    sub: boolean
    }) => {

    /*
        // Purpose of this was to handle submenus. Suspended at the moment
    */
    // if (menuItem.submenu) {
    //     return (
    //         <li className={style.navItem} onClick={(e) => e.target.style.background='red'}>
    //             <ExtIcon className={style.extIcon} path='menuitem'/>
    //             <span className={style.text}>{menuItem.name}</span>
    //             <ul className={`${style['navList']} ${style['navList--sub']}`}>
    //                 {menuItem.submenu.map(item => <Menu menuItem={item} sub={true}/>)}                    
    //             </ul>            
    //         </li>
    //     )
    // }

    return (
        <li className={style.navItem}>
            {/* <ExtIcon className={sub ? `${style['extIcon']} ${style[`extIcon--sub`]}` : style.extIcon} path={sub ? 'submenu' : 'menuitem'} /> */}
            <ExtIcon className={style.extIcon} path='menuitem' />
            <Link className={style.link} href={menuItem.link}>
                <ExtIcon className={`${style['extIcon']} ${style['extIcon--menu']}`} path={menuItem.icon} />
                <Icon className='' path={menuItem.icon} size={1} />
                <span className={style.text}>{menuItem.name}</span>
            </Link>
        </li>
    )    
}

export default Menu