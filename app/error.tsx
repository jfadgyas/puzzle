'use client'

import style from './error.module.scss'

const ErrorBoundary = ({error}: {error: Error}) => {
    
    return (
        <main className={style.error} id='error'>
            <h1 className={style.statusCode}>An error occurred</h1>
            <p className={style.message}>{error.message}</p>
        </main>
    )
}

export default ErrorBoundary