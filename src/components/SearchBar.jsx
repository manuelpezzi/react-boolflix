import { useAppContext } from '../context/AppContext';

function SearchBar() {
    const { search, setSearch, setSelectedGenre, isAvailable } = useAppContext();

    if (!isAvailable) {
        return (
            <div className="alert alert-danger" role="alert">
                Errore: SearchBar deve essere usato all'interno di un AppProvider.
            </div>
        );
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setSelectedGenre('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSearch(e.target.value);
            setSelectedGenre('');
        }
    };

    const handleReset = () => {
        setSearch('');
        setSelectedGenre('');
    };

    return (
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                placeholder="Cerca un film o una serie..."
                value={search}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
            />
            <button className="btn btn-primary" onClick={() => setSearch(search)}>
                Cerca
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
                Reset
            </button>
        </div>
    );
}

export default SearchBar;