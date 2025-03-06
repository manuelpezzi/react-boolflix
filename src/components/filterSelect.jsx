import { useAppContext } from '../context/AppContext';

function FilterSelect() {
    const { setSelectedGenre, genres, isAvailable } = useAppContext();

    if (!isAvailable) {
        return (
            <div className="alert alert-danger" role="alert">
                Errore: FilterSelect deve essere usato all'interno di un AppProvider.
            </div>
        );
    }

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
    };

    return (
        <select className="form-select" onChange={handleGenreChange}>
            <option value="">Tutti i generi</option>
            {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                    {genre.name}
                </option>
            ))}
        </select>
    );
}

export default FilterSelect;