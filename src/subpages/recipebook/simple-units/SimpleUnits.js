import { useEffect, useState } from "react";

import style from "./simpleunits.module.css";

export default function Main({ header, type, placeholder }) {

    const [values, setValues] = useState([{ id: 0, value: "" }]);

    const handleAdd = async () => {
        fetch(`http://aaronmuetze.ddns.net:8080/${type}/add`)
            .then(response => response.json())
            .then(data => console.log(data))
            .then(() => handleGetAll())
            .catch(error => console.error(error));
    }

    const handleGetAll = async  () => {
        fetch(`http://aaronmuetze.ddns.net:8080/${type}/all`)
            .then(response => response.json())
            .then(data => setValues(data))
            .catch(error => console.error(error));
    }

    useEffect(() => { handleGetAll()}, [])

    return (
        <section>
            <div className="container">
                <div className={style.wrapper}>
                    <h2>{header}</h2>
                    {values.map((item, index) => (
                        <ItemView item={item} key={index} type={type} placeholder={placeholder} handleGetAll={handleGetAll} />
                    ))}
                    <button type="button" className="dark" onClick={() => handleAdd()}>hinzufügen</button>
                </div>
            </div>
        </section>
    )
}

function ItemView({ item, type, placeholder, handleGetAll }) {

    const [timeoutId, setTimeoutId] = useState(null);

    const handleChange = async (value) => {
        item.value = value;
        clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(async () => {
            fetch(`http://aaronmuetze.ddns.net:8080/${type}/change`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: item.id,
                    column: "name",
                    value
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .then(() => handleGetAll())
                .catch(error => console.error(error))
        }, 200);
        setTimeoutId(newTimeoutId);
    }

    const handleRemove = async () => {
        fetch(`http://aaronmuetze.ddns.net:8080/${type}/remove/${item.id}`)
            .then(response => response.json())
            .then(data => console.log(data))
            .then(() => handleGetAll())
            .catch(error => console.error(error));
    }

    return (
        <div className={style["item-wrapper"]}>
            <input type="text" className="dark" placeholder={placeholder} value={item.value} onChange={(event) => handleChange(event.target.value)} />
            <button type="button" className="bright" onClick={handleRemove}>entfernen</button>
        </div>
    )
}