import { useAppContext } from '../context/AppContext';
import ReactCountryFlag from 'react-country-flag';

function Card({ item }) {
    const { isAvailable } = useAppContext();

    if (!isAvailable) {
        return (
            <div className="col">
                <div className="alert alert-danger" role="alert">
                    Errore: Card deve essere usato all'interno di un AppProvider.
                </div>
            </div>
        );
    }



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
    const languageToCountryCode = {
        en: 'US',
        es: 'ES',
        it: 'IT',
        fr: 'FR',
        de: 'DE',
        ja: 'JP',

    };

    const getCountryCode = (language) => {
        return languageToCountryCode[language] || null;
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
                        <strong>Lingua:</strong>{' '}
                        {item.language && getCountryCode(item.language.toLowerCase()) ? (
                            <ReactCountryFlag
                                countryCode={getCountryCode(item.language.toLowerCase())}
                                svg
                                style={{
                                    width: '1.5em',
                                    height: '1.5em',
                                    verticalAlign: 'middle',
                                    marginLeft: '5px',
                                }}
                                title={item.language.toUpperCase()}
                            />
                        ) : (
                            item.language || 'N/A'
                        )}
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