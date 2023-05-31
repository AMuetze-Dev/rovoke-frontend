import style from "./mottocontainer.module.css"

export default function Main({ label, motto }) {

    return (
        <div className={style.wrap}>
            <label>{label}</label>
            <h2>{motto}</h2>
        </div>
    )
}