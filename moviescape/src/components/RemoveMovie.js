import React,{useState} from 'react';

function RemoveMovie(){

    const [movieID,setMovieID]=useState('');
    const [flag,setFlag]=useState(true);

    const setMovieIDHandler=(e)=>{
        setMovieID(e.target.value);
    }

    const removeMovie=async(a)=>{
        const movieIDObj={
            movieID
        };

        const response=await fetch('/RemoveMovie',{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(movieIDObj)
        }).then(response=>response.json().then(data=>{
            if(data['message']==="SUCCESS"){
                setFlag(true);
                window.location.href="/";
            }else{
                setFlag(false);
            }
        }));

    }

    return(
        <div>

        <br/><br/>
        <section className="searchbox-wrap">
            <input 
                type="text" 
                placeholder="enter movie ID..." 
                className="searchbox"
                onChange={setMovieIDHandler}
                value={movieID}
            /> 
        </section>
        <br/>

        <div className="Login-base-container">
            <button type="button" className="confirm-login" onClick={async()=>{await removeMovie("a")}} >Remove</button>
        </div>

        {(flag===false)?
            <div className="no-bookings" ><br/><br/><br/><br/><br/><br/><h3 className="no-bookings1" style={{"color":"white"}} >Movie Does Not Exist</h3></div>
            :false
        }

        </div>
    );
};

export default RemoveMovie;
