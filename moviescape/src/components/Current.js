import React from 'react';

function Current({current,openPopup}){
    return(
        <div className="current" onClick={()=>openPopup(current.imdbID)}>
            <img src={current.Poster} />
            <h3>{current.Title}</h3>
        </div>
    );
}

export default Current;