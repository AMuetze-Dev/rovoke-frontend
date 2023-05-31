import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import style from "./recipebook.module.css"

import Header from "../../permanent/boxing/Header";

export default function Main() {

    return (
        <>
            <section>
                <Header title="Rezeptbuch" bright={false} />
                <div className="container">
                    <SearchContainer />
                </div>
            </section>
        </>
    )
}

function SearchContainer() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/recipe/all")
            .then(response => response.json())
            .then(data => setRecipes(data.map((recipe) => ({ id: recipe.id, name: recipe.title }))))
            .catch(error => console.error(error));
    })

    return (
        <div className={style["search-wrapper"]}>
            <h2>Rezeptsuche</h2>
            <SearchInputField placeholder={"Rezepte durchsuchen"} options={recipes} />
        </div>
    )
}

function SearchInputField({ placeholder, options, updateFunction, clear = false }) {
    const [searchResults, setSearchResults] = useState([{ id: 0, name: 0 }]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    const handleSearch = (searchText) => {
        const list = [];
        for (let i = 0; i < options.length; i++)
            if (options[i].name.toLowerCase().includes(searchText.toLowerCase()))
                list.push(options[i]);
        setSearchResults(list);
    }

    const handleInputChange = (name) => { setSearchText(name); handleSearch(name); }
    const handleInputFocus = () => setIsOpen(true);
    const handleInputBlur = () => setIsOpen(false);
    const handleButtonDown = (id, name) => { setSearchText(clear ? "" : name); handleSearch(""); if (updateFunction !== undefined) updateFunction(id); }

    return (
        <div className={style["searchinput-wrapper"]}>
            <input className="bright" type="text" placeholder={placeholder} value={searchText} onChange={(e) => handleInputChange(e.target.value)} onFocus={handleInputFocus} onBlur={handleInputBlur} />
            {isOpen && (
                <div className={style["searchinput-options"]}>
                    {searchResults.map((result, index) => (
                        <button type="button" className={style["searchinput-option"]} key={index} onMouseDown={() => handleButtonDown(result.id, result.name)}>{result.name}</button>
                    ))}
                </div>
            )}
        </div>
    )
}