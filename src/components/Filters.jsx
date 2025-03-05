// src/components/Filters.jsx
import React from 'react';
import FilterSelect from './filterSelect';
import SearchBar from './SearchBar';

function Filters() {
    return (
        <div className="row mb-4">
            <div className="col-md-4">
                <FilterSelect />
            </div>
            <div className="col-md-8">
                <SearchBar />
            </div>
        </div>
    );
}

export default Filters;