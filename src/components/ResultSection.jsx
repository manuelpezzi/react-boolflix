import React from 'react';
import Card from './Card';

function ResultSection({ title, items }) {
    if (!items || items.length === 0) return null;

    return (
        <section className="mb-5">
            <h2>{title}</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {items.map((item, index) => (
                    <Card key={index} item={item} />
                ))}
            </div>
        </section>
    );
}

export default ResultSection;