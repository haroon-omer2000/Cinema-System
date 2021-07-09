import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import axios from 'axios';
import Popup from './components/Popup';
import Currents from './components/Currents';
import Current from './components/Current';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BookMovie from './components/BookMovie'
import AddMovie from './components/AddMovie';
import { Redirect } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import RemoveMovie from './components/RemoveMovie';
import SetMovieTime from './components/SetMovieTime';
import AllBookedMovies from './components/AllBookedMovies';
import BookedMovies from './components/BookedMovies';
import Feedback from './components/Feedback';
import Ticket from './components/Ticket';


function App() {

  const apiurl = "http://www.omdbapi.com/?apikey=61283203";

  const [flag, setFlag] = useState(true);
  const [movieName, setMovieName] = useState('');
  const [movieIMDBID, setMovieIMDBID] = useState('');
  const [movieYear, setMovieYear] = useState('');
  const [movieRating, setMovieRating] = useState('');
  const [moviePlot, setMoviePlot] = useState('');
  const [moviePoster, setMoviePoster] = useState('');
  const [movieTrailer, setMovieTrailer] = useState('');
  const [isLoggedIn,setIsLoggedIn]=useState(false);

  const handleMovieName = (e) => {
    setMovieName(e.target.value);
  }

  const handleMovieIMDBID = (e) => {
    setMovieIMDBID(e.target.value);
  }

  const handleMovieYear = (e) => {
    setMovieYear(e.target.value);
  }

  const handleMovieRating = (e) => {
    setMovieRating(e.target.value);
  }

  const handleMoviePlot = (e) => {
    setMoviePlot(e.target.value);
  }

  const handleMoviePoster = (e) => {
    setMoviePoster(e.target.value);
  }

  const handleMovieTrailer = (e) => {
    setMovieTrailer(e.target.value);
  }

  const [LoggedAs,setLoggedAs]=useState('');

  const [movies,setMovies]=useState([]);

  const [state, setState] = useState({
    search: "", //the query we are searching
    currents: [],// movies which are currently available to watch
    results: [], //the results we get after search will be in this array
    selected: {
      'Title':'undefined',
      'Plot':'',
      'Year':'',
      'Poster':'',
      'imdbID':'',
      'imdbRating':'',
      'trailer':''
    } // the movie that we click on to be displayed on popup
  });

  useEffect(async() => {
  fetch("/movies").then(response=>response.json().then(data=>{
      setMovies(data.movies);

      let ch = state.currents;

      console.log('for loop');
      for(var i=0;i<data.movies.length;i++){
        ch.push(data.movies[i]);
        console.log(data.movies[i]);
      }

      setState((prev) => {
        return { ...prev, currents: ch}
      });

      //console.log('this is state.currents',state.currents);
      
    }))
  }, []);

  const performMovieSearch=async(e)=>{

    if(e.key=="Enter"){

        flagSetter(false);

        const movieSearch=state.search;
        const response=await fetch('/SearchMovie',{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(movieSearch)
        }).then(response=>response.json().then(data=>{

          setState((prev) => {
            return { ...prev, results: []}
          });          

          let ch = [];

          if(ch.length==0){
            for(var i=0;i<data['results'].length;i++){
              ch.push(data['results'][i])
            }
          }

          else{

          for(var i=0;i<ch.length;i++){
            for(var j=0;j<data['results'].length;j++){
                if(ch[i]['imdbID']!==data['results'][j]['imdbID']){
                  ch.push(data['results'][i])
                }
            }
          }

        }

          setState((prev) => {
            return { ...prev, results: ch}
          });

        }))

    }
}

  // this function was just used for testing
  const performSearch = (e) => {
    //upon hitting enter it will evaluate query
    if (e.key === "Enter") {

      flagSetter(false);

      axios(apiurl + "&s=" + state.search).then((data) => {
        let results = data.data.Search;

        if (data.data.Response !== "False") {
          setState((prev) => {
            return { ...prev, results: results }
          });
        }

        else {
          
        }

      });
    }
  }

  const handleInput = (e) => {
    let search = e.target.value;
    setState((prevState) => {
      return { ...prevState, search: search }
    });
  }

  const flagSetter = () => {
    setFlag(false);
  }

  const openPopup = id => {

    for(var i=0;i<state.currents.length;i++){
      if(state.currents[i]['imdbID']===id){
        console.log(state.currents[i]);
        setState({
          results:state.results,
          selected:state.currents[i],
          currents:state.currents
        })
      }
    }

   /* axios(apiurl + "&i=" + id).then((data) => {
      let results = data.data;

      setState((prevState) => {
        return { ...prevState, selected: results }
      });
    })*/

  }

  const closePopup = () => {
    setState((prev) => {
      return { ...prev, selected: {
        'Title':'undefined',
        'Plot':'',
        'Year':'',
        'Poster':'',
        'imdbID':'',
        'imdbRating':''
      } }
    });
  }

  const navStyle = {
    color: 'white'
  };

  const Submit = () => {
    <Redirect to="/AddMovie" />
  }

  return (

    <Router>

      <div className="App">


        <header >
        <Link to="/" className="Cinemovies-home" onClick={()=>window.location.href="/"} >
            <h1> <span className="Home-Button">M</span>ovie<span className="flicker">S</span>cape</h1>
        </Link> 
        </header>

        {/* the main will contain the remaining app ( search/results/popup )*/}
        <main>

          <Switch>

            <Route path="/" exact render={() => (<Home handleInput={handleInput} performSearch={performSearch}
              flag={flag} currents={state.currents} openPopup={openPopup}
              results={state.results} search={state.search}
              selected={state.selected} closePopup={closePopup}
              performMovieSearch={performMovieSearch}
              isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
            />)} />

            <Route path="/AddMovie" exact render={() => (<AddMovie movieName={movieName} handleMovieName={handleMovieName}
              movieIMDBID={movieIMDBID} handleMovieIMDBID={handleMovieIMDBID}
              movieYear={movieYear} handleMovieYear={handleMovieYear}
              movieRating={movieRating} handleMovieRating={handleMovieRating}
              moviePlot={moviePlot} handleMoviePlot={handleMoviePlot}
              moviePoster={moviePoster} handleMoviePoster={handleMoviePoster}
              movieTrailer={movieTrailer} handleMovieTrailer={handleMovieTrailer}
            />)} /> 

            <Route path="/Login" exact render={()=>(<Login />)}/>

            <Route path="/Register" exact render={()=>(<Register/>)}/>

            <Route path="/BookMovie" exact render={()=>(<BookMovie />)}/>       

            <Route path="/Feedback" exact render={()=>(<Feedback/>)}/>  
      
            <Route path="/Ticket" exact render={()=>(<Ticket />)}/>            

            <Route path="/SetMovieTime" exact render={()=>(<SetMovieTime />)}/>    

            <Route path="/BookedMovies" exact render={()=>(<BookedMovies />)}/>            
        
            <Route path="/RemoveMovie" exact render={()=>(<RemoveMovie />)}/>            

            <Route path="/AllBookedMovies" exact render={()=>(<AllBookedMovies />)}/>      

          </Switch>


        </main>

      </div>

    </Router>

  );
}

export default App;