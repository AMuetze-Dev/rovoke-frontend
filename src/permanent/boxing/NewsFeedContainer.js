import style from "./newsfeedcontainer.module.css"

export default function Main({ sections }) {

    return (
        <div className="container">
            <div className={style.list}>
                <div className={style.collection}>
                    {sections.map((section, index) => (
                        <div className={style.blog} key={index}>
                            <h5>{section.title}</h5>
                            <label>{section.label}</label>
                            <p className="paragraph-light">{section.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}