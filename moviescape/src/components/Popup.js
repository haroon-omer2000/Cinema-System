import React, {useEffect}  from 'react';
import {BrowserRouter as Router, Route, Link, Switch, withRouter} from 'react-router-dom';
import YouTube from 'react-youtube-embed';

function Popup({selected,closePopup}){

    return(
        <section className="popup">
            <div className="content">

                {localStorage.setItem('Poster',selected.Poster)}
                {localStorage.setItem('Year',selected.Year)}
                {localStorage.setItem('Title',selected.Title)}
                {localStorage.setItem('imdbRating',selected.imdbRating)}
                {localStorage.setItem('imdbID',selected.imdbID)}
                {localStorage.setItem('Plot',selected.Plot)}
                {localStorage.setItem('trailer',selected.trailer)}

                <h2>{selected.Title} <span>({selected.Year})</span> </h2>
                <p className="rating"><b>Rating:</b> {selected.imdbRating}</p>
                <div className="plot">
                    <img className="Poster" src={selected.Poster} />
                    <p>{selected.Plot}</p>
                    <div className="youtube">
                    < YouTube  aspectRatio="4:3" id={selected.trailer}></YouTube> 
                    </div>
                </div>
                <div>

                {console.log('yehaii,',localStorage.getItem('trailer'))}
                <button className="close" onClick={closePopup}>Close</button>

                {(localStorage.getItem('type')==='customer')?
                <Link to="/BookMovie" onClick={()=>window.location.href="/BookMovie"} >
                    <button type="submit" className="close">Book</button>
                </Link>
                :false
                }

                </div>
            </div>
        </section>
    );
}

export default Popup;


