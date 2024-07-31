'use client'

import { useRef } from "react"

const Filter = () => {

    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = () => {
        console.log('change action')
    }

    return (
        <div>
            Filter
            <form>
                <input
                    ref={inputRef}
                    onChange={handleChange}>
                </input>
            </form>
        </div>
    )
}

export default Filter