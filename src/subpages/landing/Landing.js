import { useNavigate } from "react-router-dom";

import MainIntro from "../../permanent/boxing/MainIntro";
import MottoContainer from "../../permanent/boxing/MottoContainer";
import ImageGrid from "../../permanent/boxing/ImageGrid";
import BannerSection from "../../permanent/boxing/BannerSection";

export default function Main() {

    const navigate = useNavigate();

    const handleButtonOnClick = () => {
        const toolsSection = document.getElementById("tools");
        if (toolsSection)
            toolsSection.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <>
            <section>
                <MainIntro title="Rovoke" subtitle="Hier gibt es viele Tools" buttonText="zu den Tools" buttonOnClick={handleButtonOnClick} imgPath="intro-header.jpeg" bright={true} />
                <div className="container" id="tools">
                    <MottoContainer label="Was wir anbieten" motto="Nachfolgend alle Funktionalitäten, welche wir hier auf der Website aktuell zur Verfügung stehen oder werden" />
                    <hr />
                    <ImageGrid title="Rezeptbuch" text="Entdecke eine Vielzahl von köstlichen Rezepten aus verschiedenen Küchen der Welt. Finde Inspiration für deine nächste Mahlzeit und durchstöbere unsere Kategorien nach Vorspeisen, Hauptgerichten und Desserts. Passe die Rezepte nach deinen individuellen Vorlieben an und kreiere kulinarische Meisterwerke. Tauche ein in die Welt der Kochkunst und lass dich von unserer umfangreichen Sammlung verlockender Rezepte inspirieren." buttonText="ansehen" buttonOnClick={() => navigate("/Rezeptbuch")} imgPath="landing/recipebook.jpg" left={true} />
                    <ImageGrid title="Cato" text="Erlebe meinen bezaubernden Cato live über die Webcam und genieße seine süßen Momente, während er spielt und entspannt. Du hast die einzigartige Möglichkeit, ihm Leckerlis zu spenden und ihm eine Freude zu bereiten. Deine Spende hilft ihm, sich verwöhnt und glücklich zu fühlen, auch wenn du nicht persönlich vor Ort bist. Genieße die interaktive Verbindung zu Cato und schenke ihm eine extra Portion Liebe und Fürsorge." buttonText="todo" buttonOnClick={() => console.log("Cato")} imgPath="landing/cato.jpg" />
                    <ImageGrid title="Checkliste" text="text" buttonText="Checkliste" buttonOnClick={() => console.log("click")} imgPath="landing/checklist.jpg" left={true} />
                </div>
            </section>
            <section>
                <BannerSection title="Kontakt" text="Bei Fehlern oder Anfregungen nimm Kontakt mit mir auf" buttonText="Kontakt" buttonOnClick={() => console.log("klick")} brightText={true} />
            </section>
        </>
    )
}