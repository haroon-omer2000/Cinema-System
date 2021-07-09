import React from 'react';

function Search({handleInput,performSearch,search,performMovieSearch}){
    return(
        <section className="searchbox-wrap">
            <input 
                type="text" 
                placeholder="search for a movie..." 
                className="searchbox" 
                onChange={handleInput}
                value={search}
                onKeyPress={performMovieSearch} // will only work for enter key
            /> 
        </section>
    );
}

export default Search;