import { createContext, useContext, useState, useEffect } from 'react';

// Creazione del contesto
export const AppContext = createContext();

// Custom Hook
const useAppContext = () => {
    const context = useContext(AppContext);

    // Se il contesto non è disponibile, restituiamo un oggetto predefinito
    if (!context) {
        return {
            movies: [],
            series: [],
            search: '',
            setSearch: () => console.warn('setSearch non disponibile: usa il contesto dentro un AppProvider'),
            isLoading: false,
            isSearching: false,
            selectedGenre: '',
            setSelectedGenre: () => console.warn('setSelectedGenre non disponibile: usa il contesto dentro un AppProvider'),
            flags: {},
            genres: [],
            error: null,
            isAvailable: false,
        };
    }

    return {
        ...context,
        isAvailable: true,
    };
};

const AppProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(null);
    const apiKey = 'db4677eb1dd3793faea12db0edc4bc59';
    const baseImgUrl = 'https://image.tmdb.org/t/p/w342';

    const flags = {
        en: 'US',
        es: 'ES',
        it: 'IT',
        fr: 'FR',
    };

    useEffect(() => {
        const fetchGenres = () => {
            setIsLoading(true);
            setError(null);

            fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=it_IT`)
                .then(response => response.json())
                .then(movieGenresData => {
                    fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=it_IT`)
                        .then(response => response.json())
                        .then(tvGenresData => {
                            const combinedGenres = [
                                ...new Map(
                                    [...movieGenresData.genres, ...tvGenresData.genres].map(genre => [
                                        genre.id,
                                        genre,
                                    ])
                                ).values(),
                            ];

                            setGenres(combinedGenres);
                            setIsLoading(false);
                        })
                        .catch(err => {
                            setError('Errore nel caricamento dei generi');
                            setIsLoading(false);
                            console.error('Errore nel caricamento dei generi delle serie:', err);
                        });
                })
                .catch(err => {
                    setError('Errore nel caricamento dei generi');
                    setIsLoading(false);
                    console.error('Errore nel caricamento dei generi dei film:', err);
                });
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMedia = () => {
            if (!search && !selectedGenre) return;
            setIsLoading(true);
            setIsSearching(true);
            setError(null);
            const genreParam = selectedGenre ? `&with_genres=${selectedGenre}` : '';
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=it_IT&query=${search}${genreParam}`)
                .then(response => response.json())
                .then(movieData => {
                    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=it_IT&query=${search}${genreParam}`)
                        .then(response => response.json())
                        .then(tvData => {
                            const normalizedMovies = movieData.results.map(item => ({
                                title: item.title,
                                original_title: item.original_title,
                                language: item.original_language,
                                vote: item.vote_average,
                                poster: item.poster_path ? `${baseImgUrl}${item.poster_path}` : null,
                                type: 'Movie',
                                overview: item.overview,
                            }));
                            const normalizedSeries = tvData.results.map(item => ({
                                title: item.name,
                                original_title: item.original_name,
                                language: item.original_language,
                                vote: item.vote_average,
                                poster: item.poster_path ? `${baseImgUrl}${item.poster_path}` : null,
                                type: 'Series',
                                overview: item.overview,
                            }));
                            setMovies(normalizedMovies);
                            setSeries(normalizedSeries);
                            setIsLoading(false);
                            setIsSearching(false);
                        })
                        .catch(err => {
                            setError('Errore nel caricamento dei media');
                            setIsLoading(false);
                            setIsSearching(false);
                            console.error('Errore nel caricamento dei media:', err);
                        });
                })
                .catch(err => {
                    setError('Errore nel caricamento dei media');
                    setIsLoading(false);
                    setIsSearching(false);
                    console.error('Errore nel caricamento dei media:', err);
                });
        };

        fetchMedia();
    }, [search, selectedGenre]);

    const value = {
        movies,
        series,
        search,
        setSearch,
        isLoading,
        isSearching,
        selectedGenre,
        setSelectedGenre,
        flags,
        genres,
        error,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppProvider, useAppContext };