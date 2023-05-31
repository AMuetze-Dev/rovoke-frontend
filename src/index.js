import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useLocalStorage from "use-local-storage";

import "./theme.css"

import Navbar from "./permanent/navbar/Navbar";
import BackArrow from "./permanent/backArrow/BackArrow"
import Landing from "./subpages/landing/Landing";
import Recipebook from "./subpages/recipebook/Recipebook";
import Footer from "./permanent/footer/Footer"

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

function App() {

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage("theme", defaultDark ? "dark" : "light");
  const switchTheme = () => setTheme(theme === "light" ? "dark" : "light");
  document.body.setAttribute("data-theme", theme);

  return (
    <>
      <StrictMode>
        <BrowserRouter>
          <Navbar />
          <BackArrow />
          <div className="body">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/rezeptbuch/*" element={<Recipebook />} />
            </Routes>
          </div>
          <Footer switchTheme={switchTheme} />
        </BrowserRouter>
      </StrictMode>
    </>
  )
}
