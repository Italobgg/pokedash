import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
/* import AppNavbar from "./components/Navbar";*/
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Pokemons from "./pages/Pokemons";
import About from "./pages/About";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <Router>
{/*     <AppNavbar />
 */}    <div className="d-flex">
      <Sidebar />
      <div className="content flex-grow-1 p-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemons" element={<Pokemons />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
