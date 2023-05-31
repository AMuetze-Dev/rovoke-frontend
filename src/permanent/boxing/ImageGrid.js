import style from "./imagegrid.module.css"

export default function Main({ label, title, text, buttonText, buttonOnClick, imgPath, left = false }) {

    return (
        <div className={"w-layout-grid " + style["grid"] + " " + style[left ? "left" : "right"]}>
            {!left && <img src={`/images/${imgPath}`} />}
            <div className={style["div-block"]}>
                <div className={style["section-wrap"]}>
                    {label !== undefined && <label>{label}</label>}
                    <h2>{title}</h2>
                    <p className="paragraph-light">{text}</p>
                </div>
                <button className="dark" onClick={buttonOnClick}>{buttonText}</button>
            </div>
            {left && <img src={`/images/${imgPath}`} />}
        </div>
    )
}