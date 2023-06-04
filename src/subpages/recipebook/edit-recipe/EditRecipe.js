import { useEffect, useState } from "react";

import style from "./editrecipe.module.css";

export default function Main() {

    //DB STUFF
    const [ingredients, setIngredients] = useState([{ id: 0, name: "", protein: 0, carbohydrates: 0, fat: 0 }])
    const [kinds, setKinds] = useState([{ id: 0, name: "" }])
    const [units, setUnits] = useState([{ id: 0, name: "" }])

    //RECIPE STUFF
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [preparation, setPreparation] = useState(0);
    const [cooking, setCooking] = useState(0);
    const [kind, setKind] = useState(kinds[0]);
    const [categories, setCategories] = useState([""]);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [instructions, setInstructions] = useState([""]);

    useEffect(() => {
        fetch("http://localhost:8080/ingredient/all")
            .then(response => response.json())
            .then(data => setIngredients(data.map((ingredient) => ({ id: ingredient.id, name: ingredient.name, protein: ingredient.protein, carbohydrates: ingredient.carbohydrates, fat: ingredient.fat }))))
            .catch(error => console.error(error));
        fetchSimpleData("http://localhost:8080/kind/all", setKinds);
        fetchSimpleData("http://localhost:8080/unit/all", setUnits);
    }, [])

    function fetchSimpleData(url, setData) {
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data.map(e => ({ id: e.id, name: e.value }))))
            .catch(error => console.error(error));
    }

    // INGREDIENTS
    const handleAddIngredient = (categoryIndex, id) => setRecipeIngredients([...recipeIngredients, { category: categoryIndex, amount: 0, unit: 0, ingredient: id - 1 }])
    const handleChangeIngredient = (updatedIngredient, index) => {
        const updatedIngredients = [...recipeIngredients];
        updatedIngredients[index] = updatedIngredient;
        setRecipeIngredients(updatedIngredients);
    }
    const handleRemoveIngredient = (index) => {
        const list = [...recipeIngredients];
        list.splice(index, 1);
        setRecipeIngredients(list);
    }

    // CATEGORIES
    const handleAddCategory = () => setCategories([...categories, ""])
    const handleChangeCategory = (index, value) => {
        const list = [...categories];
        list[index] = value;
        setCategories(list);
    }
    const handleRemoveCategory = (index) => {
        const list = [...categories];
        list.splice(index, 1);
        setCategories(list);

        for (let i = 0; i < recipeIngredients.length; i++)
            if (recipeIngredients[i].category < index)
                continue;
            else if (recipeIngredients[i].category > 0)
                recipeIngredients[i].category -= 1;
    }

    //INSTRUCTIONS
    const handleAddInstruction = () => setInstructions([...instructions], "");
    const handleChangeInstruction = (index, target) => {
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;

        let list = [...instructions];
        for (let i = 0; i < instructions.length; i++)
            if (index !== i && i + 1 !== instructions.length && instructions[i] === "")
                list.splice(i, 1);
        list[index] = target.value;
        if (index === instructions.length - 1 && target.value !== "")
            list = [...list, ""]
        setInstructions(list);
    }
    const handleRemoveInstruction = (index) => {
        const list = [...instructions];
        list.splice(index, 1);
        setInstructions(list);
    }

    //SUBMIT
    const doSubmit = (event) => {
        event.preventDefault();

        const cleanInstructions = [...instructions];
        for(let i = 0; i < cleanInstructions.length; i++)
            if(cleanInstructions[i] === "")
            cleanInstructions.splice(i--, 1);
        
        const recipe = {
            id: -1,
            title,
            difficulty,
            preparation,
            cooking,
            kind,
            instructions: cleanInstructions
        }

        const recipeIngredientList = recipeIngredients.map((ingredient) => ({...ingredient, category: categories[ingredient.category]}))

        fetch("http://aaronmuetze.ddns.net:8080/recipe/add", {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: recipe, recipeIngredientList
        })

        console.log(recipe)
        console.log(recipeIngredientList)
    }

    return (
        <section>
            <form onSubmit={(e) => doSubmit(e)}>
                <button>text</button>
            </form>
        </section>
    )
}