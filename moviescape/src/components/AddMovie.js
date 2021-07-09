import React from 'react';

function AddMovie({movieName,handleMovieName,movieIMDBID,handleMovieIMDBID,movieYear,handleMovieYear,
                   movieRating,handleMovieRating,moviePlot,handleMoviePlot,moviePoster,handleMoviePoster,movieTrailer,handleMovieTrailer,appendMovie}){
    return(
        <div className="AddMovie">
            <header>
                <h3 className="Now-Showing" >Enter Movie Details</h3>
            </header>

        <form>

            <br/><br/><br/>
            <div className="container-input1">
                <br/><br/>
                    <input value={movieName} onChange={handleMovieName} type="text" placeholder="Enter movie name..." className="enter-movie-name"  />
                    <br/>
                    <input value={movieIMDBID} onChange={handleMovieIMDBID} type="text" placeholder="Enter movie imdbID..." className="enter-movie-imdbid" />
            </div>
            <br/><br/><br/>

            <div className="container-input2">
                <br/><br/>
                    <input value={movieYear} onChange={handleMovieYear} type="text" placeholder="Enter movie year..." className="enter-movie-year"  />
                    <br/>
                    <input value={movieRating} onChange={handleMovieRating} type="text" placeholder="Enter movie rating..." className="enter-movie-rating" />
            </div>
            <br/><br/><br/>

            <div className="container-input3">
                <br/><br/>
                    <input value={moviePlot} onChange={handleMoviePlot} type="text" placeholder="Enter movie plot..." className="enter-movie-plot"  />
                    <br/>
                    <input value={moviePoster} onChange={handleMoviePoster} type="text" placeholder="Enter movie poster..." className="enter-movie-poster" />
            </div>

            <br/><br/>
            <div className="container-input3">
                    <input value={movieTrailer} onChange={handleMovieTrailer} type="text" placeholder="Enter trailer link..." className="enter-movie-plot"  />
            </div>


            <br/>

            <div>
                
            <button className="close" type="button" onClick={
                async()=>{
                    const movie={
                        movieIMDBID,
                        movieName, 
                        moviePoster,
                        movieYear,
                        movieRating,
                        moviePlot,
                        movieTrailer
                    };
                    const response=await fetch('/AddMovie',{
                        method: "POST",
                        headers: {
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify(movie)
                    });

                    window.location.href="/";

                }
            } >Confirm Add</button>
        </div>

        </form>
        
        </div>
    );
};

export default AddMovie;