import { useState } from "react";
import { Link } from "react-router-dom";

import style from "./navbar.module.css"

export default function Main() {

    const [showMenu, setShowMenu] = useState(false);

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    }


    return (
        <nav>
            <span className={style.logo}><Link to="/">Rovoke</Link></span>
            <div className={style["submenu-toggle"]} onClick={() => handleMenuToggle()}>
                <span className={style["submenu-toggle-icon"] + " " + (showMenu ? style.active : style.inactive)} />
            </div>
            <ul className={style["submenu"] + " " + (showMenu ? style.show : "")}>
                {["Checkliste", "Cato", "Rezeptbuch"].map((value, index) => (
                    <li key={index} onClick={() => handleMenuToggle()} style={{ animation: `${style.scaleZ} 300ms ${(index+1) * 120}ms ease-in-out forwards` }}><Link to={value.toLowerCase()}>{value}</Link></li>
                ))}
                <li className={style["list-toggle"]} onClick={() => handleMenuToggle()} style={{ animation: `${style.scaleZ} 300ms ${4 * 120}ms ease-in-out forwards` }}><Link to={"Kontakt"}>Kontakt</Link></li>
            </ul>
            <button type="button" className="dark">Kontakt</button>
        </nav>
    )
}