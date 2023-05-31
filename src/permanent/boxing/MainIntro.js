import style from "./mainintro.module.css"

export default function Main({ title, subtitle, buttonText, buttonOnClick, imgPath, bright = false }) {

    console.log(imgPath);

    return (
        <div className={style.header} style={{ backgroundImage: `url(/images/${imgPath})` }}>
            <div className={style.content} style={{ backgroundColor: `rgba(var(--${bright ? "light" : "dark"}),0.2)` }}>
                <div className={style.text}>
                    <h1 style={{ color: `var(--${bright ? "dark-contrast" : "light-contrast"}-color)` }}>{title}</h1>
                    <h4 style={{ color: `var(--${bright ? "dark-contrast" : "light-contrast"}-color)` }}>{subtitle}</h4>
                </div>
                <button type="button" className={`${bright ? "bright" : "dark"} jumbo `} onClick={buttonOnClick}>{buttonText}</button>
            </div>
        </div>
    )
}