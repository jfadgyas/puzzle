'use client'

import { useRef } from "react"

import Icon from '@mdi/react';
import {
    mdilMinusBox,
    mdilPlusBox,
} from '@mdi/light-js';

import style from './style/addtocart.module.scss'

type Props = {
    stock: number,
    currentQty: number,
    index: number,
    emitValue: (qty: number, index: number) => void
}

const Quantity = ({stock, currentQty, index, emitValue}: Props) => {
    
    const inputRef = useRef<HTMLInputElement>(null)

    const handleMinus = () => {
        (!isNaN(inputRef.current?.valueAsNumber!) && inputRef.current?.valueAsNumber! > 1) ? inputRef.current!.valueAsNumber -= 1 : inputRef.current!.valueAsNumber = 1
        emitValue(inputRef.current!.valueAsNumber, index)
    }

    const handlePlus = () => {
        (!isNaN(inputRef.current?.valueAsNumber!) && inputRef.current?.valueAsNumber! < stock) ? inputRef.current!.valueAsNumber += 1 : inputRef.current!.valueAsNumber = 1
        emitValue(inputRef.current!.valueAsNumber, index)
    }

    const handleChange = () => {
        (!isNaN(inputRef.current?.valueAsNumber!) && inputRef.current?.valueAsNumber! <= stock && inputRef.current?.valueAsNumber! > 0) && emitValue(inputRef.current!.valueAsNumber, index)
    }

    return (
        <div id='quantity' className={style.qtyWrapper}>
            <button
                className={style.button}
                onClick={() => handleMinus()}
                >
                <Icon className='' path={mdilMinusBox} size={1} />
            </button>
            <input
                className={style.input}
                ref={inputRef}
                type='number'
                min='1'
                max={stock}
                step='1'
                defaultValue={currentQty}
                onChange={() => handleChange()}
                >
            </input>
            <button
                className={style.button}
                onClick={() => handlePlus()}
                >
                <Icon className='' path={mdilPlusBox} size={1} />
            </button>
        </div>
    )
}

export default Quantity