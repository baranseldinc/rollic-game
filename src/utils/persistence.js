const Persistence = () => {
    const appKey = 'rollic-app-game-list';
    const listData = localStorage.getItem(appKey);
    const list = listData ? JSON.parse(listData) : [];

    const saveList = () => localStorage.setItem(appKey, JSON.stringify(list));
    return {
        getList: () => list,
        addToList: gameItem => {
            list.push(gameItem);
            saveList();
        },
        deleteFromList: index => {
            list.splice(index, 1);
            saveList();
        }
    }
}

export default Persistence;