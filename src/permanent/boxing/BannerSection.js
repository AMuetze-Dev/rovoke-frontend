import style from "./bannersection.module.css"

export default function Main({title, text, buttonText, buttonOnClick, brightText = false}) {

    return (
        <section className={style["banner-section"]}>
            <div className="container">
                <div className={style.banner}>
                    <div className={style.content}>
                        <div className={style.text + " " + brightText ? "bright" : "dark"}>
                            <h2>{title}</h2>
                            <p className="paragraph-light">{text}</p>
                        </div>
                        <button type="button" className="dark" onClick={buttonOnClick}>{buttonText}</button>
                    </div>
                </div>
            </div>
        </section>
    )
}