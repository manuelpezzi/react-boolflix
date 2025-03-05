// src/components/Card.jsx
import React from 'react';
import { useAppContext } from '../context/AppContext';

function Card({ item }) {
    const { flags, isAvailable } = useAppContext();

    if (!isAvailable) {
        return (
            <div className="col">
                <div className="alert alert-danger" role="alert">
                    Errore: Card deve essere usato all'interno di un AppProvider.
                </div>
            </div>
        );
    }

    const getFlag = (language) => {
        return flags[language] || language;
    };

    const renderStars = (vote) => {
        const starsCount = Math.round(vote / 2);
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={i < starsCount ? 'star filled' : 'star'}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="col">
            <div
                className="card-netflix"
                style={{
                    backgroundImage: item.poster ? `url(${item.poster})` : 'none',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="card-overlay">
                    <h5 className="card-title">{item.title}</h5>
                    <p>
                        <strong>Titolo originale:</strong> {item.original_title}
                    </p>
                    <p>
                        <strong>Lingua:</strong> {getFlag(item.language)}
                    </p>
                    <p>
                        <strong>Voto:</strong> {renderStars(item.vote)}
                    </p>
                    <p>
                        <strong>Overview:</strong> {item.overview || 'Non disponibile'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Card;