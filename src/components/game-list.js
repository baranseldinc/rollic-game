import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Persistence from "../utils/persistence";

export default function GameList() {
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState(list);
    useEffect(() => {
        const list = Persistence().getList();
        setList(list);
        setFilteredList(list);

    }, []);

    const handleClickDelete = index => {
        Persistence().deleteFromList(index);
        const newList = Persistence().getList();
        setList(newList);
        setFilteredList(newList);
        window.toastr.success("Deleted!");
    }

    const handleChangeFilter = e => {
        const value = e.target.value?.toLowerCase() || '';

        let filteredList = list.filter(item => item.game_name.toLowerCase().includes(value) ||
            item.owner.toLowerCase().includes(value) ||
            item.bundle.toLowerCase().includes(value) ||
            item.icon_file.toLowerCase().includes(value)
        )
        setFilteredList(filteredList);
    }
    return (
        <section id="game-list">
            <h3 className="section-title">Game List</h3>
            <div className="search-bar">
                <div className="input-search-container">
                    <input type="text" placeholder="Filter by all fields..." onChange={handleChangeFilter} />
                </div>
                <Link to="/add-new-game">
                    <button className="btn btn-primary">New Game</button>
                </Link>
            </div>
            <hr />
            <div className="game-list-container">
                {
                    filteredList.length > 0 ?
                        filteredList.map((game, index) => {
                            return (
                                <div key={index} className="game-card">
                                    <img src={`${game.icon_data}`} alt={`alt-${index}`} />
                                    <div className="game-details">
                                        <div className="game-detail">Game Name: <span>{game.game_name}</span></div>
                                        <div className="game-detail">Bundle: <span>{game.bundle}</span></div>
                                        <div className="game-detail">Owner: <span>{game.owner}</span></div>
                                    </div>
                                    <button className="btn btn-small btn-danger" onClick={() => { handleClickDelete(index) }}>Delete</button>
                                </div>
                            );
                        })
                        : <p style={{ textAlign: 'center', width: '100%' }}> - No Record Found - </p>
                }
            </div>
        </section >
    );
}