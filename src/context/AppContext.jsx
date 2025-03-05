
import React, { createContext, useContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const useAppContext = () => {
    const context = useContext(AppContext);

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



    // Carica i generi disponibili all'avvio
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

    // Effettua la ricerca o il filtro per genere quando cambiano search o selectedGenre
    useEffect(() => {
        const fetchMedia = () => {
            setIsLoading(true);
            setIsSearching(true);
            setError(null);

            // Se c'è una ricerca testuale, usiamo /search/movie e /search/tv
            if (search) {
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=it_IT&query=${search}`)
                    .then(response => response.json())
                    .then(movieData => {
                        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=it_IT&query=${search}`)
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
                                setError('Errore nella ricerca delle serie. Riprova più tardi.');
                                setIsLoading(false);
                                setIsSearching(false);
                                console.error('Errore nella ricerca delle serie:', err);
                            });
                    })
                    .catch(err => {
                        setError('Errore nella ricerca dei film. Riprova più tardi.');
                        setIsLoading(false);
                        setIsSearching(false);
                        console.error('Errore nella ricerca dei film:', err);
                    });
            }
            // Se non c'è una ricerca testuale ma c'è un filtro per genere, usiamo /discover/movie e /discover/tv
            else if (selectedGenre) {
                fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=it_IT&with_genres=${selectedGenre}`)
                    .then(response => response.json())
                    .then(movieData => {
                        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=it_IT&with_genres=${selectedGenre}`)
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
                                setError('Errore nel filtraggio delle serie per genere. Riprova più tardi.');
                                setIsLoading(false);
                                setIsSearching(false);
                                console.error('Errore nel filtraggio delle serie per genere:', err);
                            });
                    })
                    .catch(err => {
                        setError('Errore nel filtraggio dei film per genere. Riprova più tardi.');
                        setIsLoading(false);
                        setIsSearching(false);
                        console.error('Errore nel filtraggio dei film per genere:', err);
                    });
            }
            // Se non ci sono né ricerca né filtro, svuotiamo i risultati
            else {
                setMovies([]);
                setSeries([]);
                setIsLoading(false);
                setIsSearching(false);
            }
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
        genres,
        error,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppProvider, useAppContext };