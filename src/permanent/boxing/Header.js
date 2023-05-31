import style from "./header.module.css"

export default function Main({ title, bright = false }) {

    return (
        <div className={style.header} style={{ backgroundColor: `var(--${bright ? "light" : "dark"}-color)` }}>
            <h1 className={bright ? "dark" : "bright"}>{title}</h1>
        </div>
    )
}