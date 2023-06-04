import React, { useEffect, useState } from "react";

import style from "./ingredients.module.css"

export default function Main() {
    const [ingredients, setIngredients] = useState([{ id: 0, name: "", protein: 0.0, carbohydrates: 0.0, fat: 0.0 }]);

    const handleAdd = () => {
        fetch(`http://aaronmuetze.ddns.net:8080/ingredient/add`)
            .then(response => response.json())
            .then(data => console.log(data))
            .then(() => handleGetAll())
            .catch(error => console.error(error));
    }

    useEffect(() => { handleGetAll() }, [])

    const handleGetAll = () => {
        fetch("http://aaronmuetze.ddns.net:8080/ingredient/all")
            .then(response => response.json())
            .then(data => setIngredients(data))
            .catch(error => console.error(error));
    }

    return (
        <section>
            <div className="container">
                <div className={style.wrapper}>
                    {ingredients.map((value, index) => (
                        <React.Fragment key={index}>
                            <IngredientView ingredient={value} handleGetAll={handleGetAll} />
                            {index + 1 !== ingredients.length && <hr />}
                        </React.Fragment>
                    ))}
                </div>
                <div className={style.options}>
                    <button type="button" className="dark" onClick={() => handleAdd()}>add</button>
                    <button type="button" className="dark" onClick={() => handleGetAll()}>reload</button>
                </div>
            </div>
        </section>
    )
}

function IngredientView({ ingredient, handleGetAll }) {

    const [timeoutId, setTimeoutId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleInputChange = async (value, column) => {
        if (column === "name") {
            ingredient[column] = value;
        } else {
            if (isNaN(value)) {
                return;
            }
            ingredient[column] = Number(value);
        }

        clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(async () => {
            fetch("http://aaronmuetze.ddns.net:8080/ingredient/change", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: ingredient.id,
                    column,
                    value: ingredient[column]
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
        }, 200);
        setTimeoutId(newTimeoutId);
    }

    const handleRemoveIngredient = () => {
        fetch(`http://aaronmuetze.ddns.net:8080/ingredient/remove/${ingredient.id}`)
            .then(reponse => reponse.json())
            .then(data => console.log(data))
            .then(() => handleGetAll())
            .catch(error => console.error(error));
    }

    return (
        <div className={style["ingredient-wrapper"]}>
            <div className={style["head-wrapper"]}>
                <label>Bezeichnung</label>
                <div className={style.name}>
                    <input type="text" className="bright" placeholder="Bezeichnung" value={ingredient.name} onChange={(e) => handleInputChange(e.target.value, "name")} />
                    <button type="button" className="bright" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <>&#9650;</> : <>&#9660;</>}</button>
                </div>
            </div>
            {isOpen && (
                <div className={style.container}>
                    <div className={style["macro-wrapper"]}>
                        <div className={style["macro"]}>
                            <label>Protein</label>
                            <input type="number" className="bright" placeholder="Protein" value={ingredient.protein} onChange={(e) => handleInputChange(e.target.value, "protein")} />
                        </div>
                        <div className={style["macro"]}>
                            <label>Kohlenhydrate</label>
                            <input type="number" className="bright" placeholder="Kohlenhydrate" value={ingredient.carbohydrates} onChange={(e) => handleInputChange(e.target.value, "carbohydrates")} />
                        </div>
                        <div className={style["macro"]}>
                            <label>Fett</label>
                            <input type="number" className="bright" placeholder="Fett" value={ingredient.fat} onChange={(e) => handleInputChange(e.target.value, "fat")} />
                        </div>
                    </div>
                    <button type="button" className="bright" onClick={handleRemoveIngredient}>entfernen</button>
                </div>
            )}
        </div>
    )

}