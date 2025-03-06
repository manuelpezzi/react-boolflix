
import { useAppContext } from '../context/AppContext';
import SearchBar from './SearchBar';
import FilterSelect from './filterSelect'
import Loader from './Loader';

function Header() {
    const { isLoading, isAvailable, setSearch, setSelectedGenre } = useAppContext();
    const handleReset = () => {
        setSearch('');
        setSelectedGenre('');
    };

    if (!isAvailable) {
        return (
            <header className="bg-primary text-white p-4">
                <div className="alert alert-danger" role="alert">
                    Errore: Header deve essere usato all'interno di un AppProvider.
                </div>
            </header>
        );
    }

    return (
        <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
            <h1 className="logo m-0" onClick={handleReset}>BOOLFLIX</h1>
            {isLoading && <Loader />}
            <div className="d-flex align-items-center">
                <div className="search-bar">
                    <SearchBar />
                </div>
                <div className="genre-filter">
                    <FilterSelect />
                </div>
            </div>
        </header>
    );
}

export default Header;