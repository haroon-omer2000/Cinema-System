import React, { useState } from 'react';

function SetMovieTime(){

    const [movieID,setMovieID]=useState('');
    const [time1,setTime1]=useState('');
    const [time2,setTime2]=useState('');
    const [time3,setTime3]=useState('');
    const [flag,setFlag]=useState(true);

    const setMovieIDHandler=(e)=>{
        setMovieID(e.target.value);
        console.log(movieID);
    }

    const applyChanges=async(a)=>{
        var selectBox = document.getElementById("select_time1");
        var time1 = selectBox.options[selectBox.selectedIndex].value;

        var selectBox = document.getElementById("select_time2");
        var time2 = selectBox.options[selectBox.selectedIndex].value;

        var selectBox = document.getElementById("select_time3");
        var time3 = selectBox.options[selectBox.selectedIndex].value;

        var selectBox = document.getElementById("select_room");
        var roomnum = selectBox.options[selectBox.selectedIndex].value;

        if(roomnum==="room1"){
            roomnum=1;
        }else if(roomnum==="room2"){
            roomnum=2;
        }else{
            roomnum=3;
        }
        
        const setTime={
            movieID,
            time1,
            time2,
            time3,
            roomnum
        };
        const response=await fetch('/SetMovieTime',{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(setTime)
        }).then(response=>response.json().then(data=>{           
                if(data['message']==="FAILURE"){
                    setFlag(false);
                }else{
                    setFlag(true);
                    window.location.href="/";
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

        <div className="Ticket_Details">

        <div className="select">

            <label className="login-register" htmlFor="select_time" style={{color:"white"}} >Time 1: </label>   
            <select id="select_time1" className="filter-todo"  >
                <option value="None">None</option>
                <option value="14:00-16:00">14:00-16:00</option>
                <option value="18:00-20:00">18:00-20:00</option>
                <option value="22:00-24:00">22:00-24:00</option>
            </select>

        </div>

        <div className="select">

            <label className="login-register" htmlFor="select_time" style={{color:"white"}} >Time 2: </label>   
            <select id="select_time2" className="filter-todo"  >
                <option value="None">None</option>
                <option value="14:00-16:00">14:00-16:00</option>
                <option value="18:00-20:00">18:00-20:00</option>
                <option value="22:00-24:00">22:00-24:00</option>
            </select>

        </div>


        <div className="select">

            <label className="login-register" htmlFor="select_time" style={{color:"white"}} >Time 3: </label>   
            <select id="select_time3" className="filter-todo"  >
                <option value="None">None</option>
                <option value="14:00-16:00">14:00-16:00</option>
                <option value="18:00-20:00">18:00-20:00</option>
                <option value="22:00-24:00">22:00-24:00</option>
            </select>

        </div>

        </div>

        <br/><br/>

        <div className="Ticket_Details">
            <div className="select">
                <label className="login-register" htmlFor="select_time" style={{color:"white"}} >Room No: </label>   
                    <select id="select_room" className="filter-todo"  >
                        <option value="room1">Room 1</option>
                        <option value="room2">Room 2</option>
                        <option value="room3">Room 3</option>
                    </select>
            </div>
        </div><br/><br/>
        
        <div className="Login-base-container">
            <button type="button" className="confirm-login" onClick={async()=>{await applyChanges("a")}} >Apply</button>
        </div>

        {(flag===false)?
            <div className="no-bookings" ><br/><br/><br/><br/><br/><br/><h3 className="no-bookings1" style={{"color":"white"}} >Invalid Movie ID Entered</h3></div>
            :false
        }

        </div>
    );
}

export default SetMovieTime;