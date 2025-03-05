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

    const formatVote = (vote) => {
        return vote ? vote.toFixed(1) : 'N/A';
    };

    return (
        <div className="col">
            <div className="card h-100">
                {item.poster && (
                    <img
                        src={item.poster}
                        className="card-img-top"
                        alt={`${item.title} poster`}
                    />
                )}
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">
                        <strong>Titolo originale:</strong> {item.original_title}<br />
                        <strong>Lingua:</strong> {getFlag(item.language)}<br />
                        <strong>Voto:</strong> {formatVote(item.vote)}<br />
                        <strong>Tipo:</strong> {item.type}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Card;