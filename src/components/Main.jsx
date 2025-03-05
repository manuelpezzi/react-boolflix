
// src/components/Main.jsx
import React from 'react';
import { useAppContext } from '../context/AppContext';
import Filters from './Filters';
import ResultSection from './ResultSection';
import Loader from './Loader';

function Main() {
    const { movies, series, isLoading, error, isAvailable } = useAppContext();

    if (!isAvailable) {
        return (
            <main className="container py-4">
                <div className="alert alert-danger" role="alert">
                    Errore: Main deve essere usato all'interno di un AppProvider.
                </div>
            </main>
        );
    }

    return (
        <main className="container py-4">
            {isLoading && <Loader />}
            <Filters />
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            {movies.length === 0 && series.length === 0 && !isLoading ? (
                <div className="text-center my-5">
                    <p>Nessun risultato trovato. Prova con un'altra ricerca.</p>
                </div>
            ) : (
                <>
                    <ResultSection title="Film" items={movies} />
                    <ResultSection title="Serie TV" items={series} />
                </>
            )}
        </main>
    );
}

export default Main;