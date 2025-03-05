

import React from 'react';
import { useAppContext } from '../context/AppContext';
import ResultSection from './ResultSection';


function Main() {
    const { movies, series, error, isAvailable } = useAppContext();

    if (!isAvailable) {
        return (
            <main >
                <div className='container py-4'>
                    <div className="alert alert-danger" role="alert">
                        Errore: Main deve essere usato all'interno di un AppProvider.
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main >
            <div className="container">

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                {movies.length === 0 && series.length === 0 ? (
                    <div className="text-center my-5">
                        <p className='text-none'>Nessun risultato trovato. Prova con un'altra ricerca.</p>
                    </div>
                ) : (
                    <>
                        <ResultSection title="Film" items={movies} />
                        <ResultSection title="Serie TV" items={series} />
                    </>
                )}
            </div>
        </main>
    );
}

export default Main;