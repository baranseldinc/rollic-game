import Header from "./components/header";
import AddNewGame from "./components/add-new-game";
import GameList from "./components/game-list";
import { Routes, Route } from "react-router-dom";

export default function App(props) {
    return (
        <div className="wrapper">
            <Header />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<GameList />} />
                    <Route path="/add-new-game" element={<AddNewGame />} />
                </Routes>
            </div >
        </div>
    );
} 