import "./footer.module.css"

export default function Main({switchTheme}) {
    return (
        <footer>
            <button type="button" className="bright jumbo" onClick={switchTheme}>Farbwechsel</button>
        </footer>
    )
}