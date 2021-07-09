import React,{useState} from 'react';
import Search from './Search';
import Popup from './Popup';
import Results from './Results';
import Currents from './Currents';
import {BrowserRouter as Router,Switch,Route, withRouter} from 'react-router-dom';
import AddMovie from './AddMovie';
import {Link} from 'react-router-dom';
import ScrollArrow from './ScrollArrow';

function Home({handleInput,performSearch,flag,currents,results,search,openPopup,selected,closePopup,performMovieSearch,isLoggedIn,setIsLoggedIn}){

    function HomePage(){
        localStorage.setItem('type','');
        localStorage.setItem('UserID','');
        localStorage.setItem('UserName','');
        localStorage.setItem('UserContact','');
        localStorage.setItem('UserEmail','');
        window.location.href='/';
    }

    return(

        <Router>

        <div className="home-container">

            <form>

            <br/>
            <div className="container">

                {(localStorage.getItem('type')==="admin")?
                    <Link to="/AddMovie" onClick={()=>window.location.href="/AddMovie"}>
                        <button  type="submit" className="AddMovie-button" >Add Movie</button>
                    </Link>
                    :false
                }

                {(localStorage.getItem('type')==="admin")?
                    <Link to="/SetMovieTime" onClick={()=>window.location.href="/SetMovieTime"}>
                        <button  type="submit" className="AddMovie-button" >Set Movie Details</button>
                    </Link>
                    :false
                }

                {(localStorage.getItem('type')==="admin")?
                    <Link to="/RemoveMovie" onClick={()=>window.location.href="/RemoveMovie"}>
                        <button  type="submit" className="AddMovie-button" >Remove Movie</button>
                    </Link>
                    :false
                }

                {(localStorage.getItem('type')==="admin")?
                    <Link to="/AllBookedMovies" onClick={()=>window.location.href="/AllBookedMovies"}>
                        <button  type="submit" className="AddMovie-button" >All Bookings</button>
                    </Link>
                    :false
                }

                {(localStorage.getItem('type')==='')?
                <Link to="/Login" onClick={()=>{localStorage.setItem('No_User_Found','false');window.location.href="/Login"}} >
                    <button  type="submit" className="login-button" >Login</button>
                </Link>
                :false
                }

                {(localStorage.getItem('type')==='')?
                <Link to="/Register" onClick={()=>window.location.href="/Register"} >
                    <button  type="submit" className="register-button" >Register</button>
                </Link>
                :false
                }
                

                {(localStorage.getItem('type')==='customer') || (localStorage.getItem('type')==='admin') ?
                  <button  type="submit" className="feedback-button" onClick={HomePage} >Logout</button>
                   :false
                }   

                {(localStorage.getItem('type')==='customer') ?
                  <Link to="/BookedMovies" onClick={()=>window.location.href="/BookedMovies"} >
                    <button  type="submit" className="feedback-button">Booked Movies</button>
                  </Link>
                   :false
                }

                {(localStorage.getItem('type')==='customer')?
                <Link to="/Feedback" onClick={()=>window.location.href="/Feedback"} >
                    <button  type="submit" className="feedback-button" >Feedback</button>
                </Link>
                :false
                }   


            </div>
            <br/>

            </form>
        
        
        <Search handleInput={handleInput} performSearch={performSearch} search={search} performMovieSearch={performMovieSearch} />
         
         {(flag===true)?<Currents currents={currents} openPopup={openPopup} />:false}
        
         <Results results={results} openPopup={openPopup} />

         {/* basically means that if tite is undefined popup will not show */}
         {(selected.Title!="undefined")? <Popup selected={selected} closePopup={closePopup} />:false}

         {(selected.Title==="undefined")?<ScrollArrow />:false}

        </div>

        </Router>
    );
};

export default Home;