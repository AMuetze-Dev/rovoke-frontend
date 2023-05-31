import { Link, useLocation } from "react-router-dom";

import style from "./backarrow.module.css";

export default function BackArrow() {
    const { pathname } = useLocation();

    const parts = pathname.split('/');
    if (parts.length > 2 || parts[1] !== "")
        return <Link to={`/${parts.slice(1, parts.length - 1).join('/')}`}><div className={style["back-arrow"]}>&#x21b6;</div></Link>
    else
        return <></>
}