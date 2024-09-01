import { useRef } from "react"

import {shippingCosts} from '@/app/models/shipping'

import Icon from '@mdi/react'
import {
    mdilChevronDown,
} from '@mdi/light-js';

import style from './style/select.module.scss'

type Props = {
    shipping: Record<string, any>,
    emitShipping: (index: number) => void
}

const Shipping = ({shipping, emitShipping}: Props) => {
    
    const selectRef = useRef<HTMLSelectElement>(null)

    const countries = shippingCosts.rates.map((item, index) =>
        <option
            key={item.country}
            value={index}>{item.country}
        </option>
    )

    return (
        <div id='shipping' className={style.customSelect}>
            <select
                className={style.select}
                ref={selectRef}
                defaultValue={shipping.index}
                onChange={(e) => emitShipping(+e.target.value)}>
                {countries}
            </select>
            <Icon
                className={style.icon}
                path={mdilChevronDown}
            />          
        </div>
    )
}

export default Shipping