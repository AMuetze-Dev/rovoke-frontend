import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";


import Header from "../../permanent/boxing/Header";
import Zutaten from "./ingredients/Ingredients";
import SimpleUnits from "./simple-units/SimpleUnits";
import EditRecipe from "./edit-recipe/EditRecipe";

import style from "./recipebook.module.css"

export default function Main() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="Zutaten" element={<Zutaten />} />
                <Route path="Gerichtarten" element={<SimpleUnits header="Arten von Gerichten" type="kind" placeholder="Art des Gerichts" />} />
                <Route path="Mengen" element={<SimpleUnits header="Arten von Gerichten" type="unit" placeholder="Art des Gerichts" />} />
                <Route path="Rezepte/All" />
                <Route path="Rezepte/Erstellen" element={<EditRecipe />} />
            </Routes>
        </>
    )
}

function Landing() {
    return (
        <section>
            <Header title="Rezeptbuch" bright={false} />
            <div className="container">
                <SearchWrapper />
                <ToolWrapper />
            </div>
        </section>
    )
}

function SearchWrapper() {

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

function ToolWrapper() {

    const navigate = useNavigate();
    const stuff = [
        {
            img: "ingredients.png",
            title: "Zutaten",
            text: "Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
            onClick: () => navigate("Zutaten")
        }, {
            img: "kinds.png",
            title: "Gerichtsarten",
            text: "Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
            onClick: () => navigate("Gerichtarten")
        }, {
            img: "amounts.png",
            title: "Mengenangaben",
            text: "Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
            onClick: () => navigate("Mengen"),
        }, {
            img: "recipebook.png",
            title: "Rezeptbuch",
            text: "Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
            onClick: () => navigate("Rezepte/All")
        }, {
            img: "recipebook.png",
            title: "Rezept erstellen",
            text: "Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
            onClick: () => navigate("Rezepte/Erstellen")
        }
    ]

    return (
        <div className={"w-layout-grid " + style["service-wrapper"]}>
            {stuff.map((object, index) => (
                <div className={style.service} onClick={object.onClick}>
                    <div className={style["service-icon-wrapper"]}>
                        <div className={style["service-icon"]}>
                            <img src={`images/recipebook/${object.img}`} alt={`${object.img} not found`} />
                        </div>
                    </div>
                    <h5>{object.title}</h5>
                    <p className="paragraph-light">{object.text}</p>
                </div>
            ))
            }
        </div>
    )
}