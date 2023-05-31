import style from "./titletextcontainer.module.css"

export default function Main({ title, text }) {

    const paragraphs = text.split(/\n+/);

    return (
        <div className="container">
            <div className={style.content}>
                <div className={style.title}>
                    <h2>{title}</h2>
                </div>
                <hr />
                <div className={style.text}>
                    {paragraphs.map((paragraph, index) => (
                        <p className="paragraph-light" key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}