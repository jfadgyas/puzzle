import style from './style/loader.module.scss'

const Loader = () => {
  return (
    <div className={style.loading}>
        <ul className={style.list} id='loading'>
            <li className={style.item}></li>
            <li className={style.item}></li>
            <li className={style.item}></li>
            <li className={style.item}></li>
            <li className={style.item}></li>
            <li className={style.item}></li>
            <li className={style.item}></li>
            <li className={style.item}></li>
            <li className={style.item}></li>
        </ul>
        <p className={style.text}>Loading...</p>
    </div>
  )
}

export default Loader