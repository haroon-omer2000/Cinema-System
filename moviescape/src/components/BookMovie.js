import React, { useState,useEffect } from 'react';
import Cards from 'react-credit-cards';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import 'react-credit-cards/es/styles-compiled.css';
//import Ticket from './Ticket';

function BookMovie(){

    const [movieTimings,setMovieTimings]=useState([]);
    const [roomNum,setRoomNum]=useState([]);
    const [availableSeats,setAvailableSeats]=useState([]);
    const [listAvailable,setListAvailable]=useState([]);

    useEffect(async()=>{


        // Fetching Movie timings and room number
        var movieID=(localStorage.getItem('imdbID'));

        
        const movieIMDBID={
            movieID
        };

        const response= await fetch('/GetMovieSchedule',{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(movieIMDBID)
        }).then(response=>response.json().then(data=>{
        
            let ch=[];

            for(var i=0;i<data['message'][0].length-1;i++){
                ch.push(data['message'][0][i]);
            }

            let ch1=[];
            ch1.push(data['message'][0][data['message'][0].length-1]);

            setMovieTimings(ch);

            setRoomNum(ch1);

            var selectBox = document.getElementById("select_time");
            var selected_time = selectBox.options[selectBox.selectedIndex].value;

            var index=-1;

            if(selected_time==="14:00-16:00"){
                index=0;
            }else if(selected_time==="18:00-20:00"){
                index=1;
            }else{
                index=2;
            }
            
            let ch2=[];

            for(var i=0;i<data['available'][index].length;i++){
                ch2.push(data['available'][index][i]);
            }

            setAvailableSeats(ch2);

            let ch3=[]
            for(var i=0;i<data['available'].length;i++){
                ch3.push(data['available'][i]);
            }
            setListAvailable(ch3);

        }));

    },[])


    function selectTime() {
        var selectBox = document.getElementById("select_time");
        var selected_time = selectBox.options[selectBox.selectedIndex].value;

        var index=-1;

        if(selected_time==="14:00-16:00"){
            index=0;
        }else if(selected_time==="18:00-20:00"){
            index=1;
        }else{
            index=2;
        }

        let ch=[]
        for(var i=0;i<listAvailable[index].length;i++){
            ch.push(listAvailable[index][i]);
        }
        setAvailableSeats(ch);
    }

    function selectPrice(){
        var selectBox = document.getElementById("select_price");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    }

    // Taking credit card information here

    const [cardNumber,setCardNumber]=useState('');
    const [cardName,setCardName]=useState('');
    const [cardExpiry,setCardExpiry]=useState('');
    const [cardCVC,setCardCVC]=useState('');
    const [focus,setFocus]=useState('');

    const cardNumberHandler=(e)=>{
        setCardNumber(e.target.value);
    }

    const cardNameHandler=(e)=>{
        setCardName(e.target.value);
    }

    const expiryHandler=(e)=>{
        setCardExpiry(e.target.value);
    }

    const cvcHandler=(e)=>{
        setCardCVC(e.target.value);
    }

    const focusHandler=(e)=>{
        setFocus(e.target.value);
    }

    const confirmBooking=async(type)=>{

        var username=localStorage.getItem('UserName');
        var useremail=localStorage.getItem('UserEmail');
        var moviename=localStorage.getItem('Title');

        var selectBox = document.getElementById("select_time");
        var duration = selectBox.options[selectBox.selectedIndex].value;

        var selectBox = document.getElementById("select_price");
        var ticket = selectBox.options[selectBox.selectedIndex].value;
        ticket=ticket.split('/');
        var tickettype=ticket[0];

        var payment="";

        if(type==="card"){
            payment="Paid";
        }else{
            payment="Pending";
        }

        var roomno=roomNum[0];

        var selectBox = document.getElementById("select_seat");
        var selected_seat = selectBox.options[selectBox.selectedIndex].value;

        var paymenttype=type;

            const BookingInfo={
                username,
                useremail,
                moviename,
                duration,
                payment,
                paymenttype,
                tickettype,
                roomno,
                selected_seat
            };
            const response=await fetch('/BookMovie',{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(BookingInfo)
            }).then(response=>response.json().then(data=>{
                            
                localStorage.setItem('serial_num',data['message'][0]);
                localStorage.setItem('booking_time',data['message'][1]);
                localStorage.setItem('roomno',data['message'][2]);
                localStorage.setItem('selected_seat',data['message'][3]);
                localStorage.setItem('movie_time',duration);
                localStorage.setItem('tickettype',tickettype);
                localStorage.setItem('payment',payment)

            }));

            if(paymenttype==="cash"){
                window.location.href="/";
            }else{
                window.location.href="/Ticket";
            }
        }
    
    return(
            
        <div className="BookMovie">

        <form className="Ticket_Details">

            <div className="select">

                <label className="login-register" htmlFor="select_time" style={{color:"white"}} >Select Timings </label>   
                <select id="select_time" className="filter-todo" onChange={selectTime}>

                    {movieTimings.map((item, index) => {
                        return (
                            (item!=="None")?
                            <option value={item}>{item} ( Room {roomNum[0]} )</option>
                            :false
                        );
                    })}  
                    
                </select>

            </div>

            <div className="select">

                <label className="login-register" htmlFor="select_price" style={{color:"white"}} >Select Price  </label>   
                <select id="select_price" className="filter-todo" onChange={selectPrice} >
                    <option value="Silver/500">Silver : Rs 500</option>
                    <option value="Gold/650">Gold : Rs 650</option>
                    <option value="Platinum/900">Platinum : Rs 900</option>
                </select>

            </div>


        </form>

        <div className="Ticket_Details">
            <div className="select">

                <label className="login-register" htmlFor="select_seat" style={{color:"white"}} >Select Seat </label>   
                <select id="select_seat" className="filter-todo">

                    {availableSeats.map((item, index) => {
                        return (
                            <option value={item}>{item}</option>
                        );
                    })}  
                    
                </select>

            </div>
        </div>

        <h2>{localStorage.getItem('Title')} <span>({localStorage.getItem('Year')})</span> </h2>
       
        <p className="rating"><b>Rating:</b> {localStorage.getItem('imdbRating')}</p>
       
            <div className="plot">
                <img className="Poster" src={localStorage.getItem('Poster')} />
                <p>{localStorage.getItem('Plot')}</p>
            </div>
    
        <h2 className="Now-Showing" >Credit Card Payment</h2>
        <br/>

            <Cards number={cardNumber} name={cardName}  expiry={cardExpiry} cvc={cardCVC} focus={focus} />
            <form className="credit-card-input" >
                <input className="searchbox" type='tel' name="card_number" placeholder="Card Number" onChange={cardNumberHandler} value={cardNumber}  onFocus={focusHandler} />
                <input className="searchbox" type='text' name="card_name" placeholder="Card Name" onChange={cardNameHandler} value={cardName}  onFocus={focusHandler} />
                <input className="searchbox" type='text' name="card_expiry" placeholder="MM/YY Expiry" onChange={expiryHandler} value={cardExpiry} onFocus={focusHandler} />
                <input className="searchbox" type='tel' name="card_cvc" placeholder="Card CVC" onChange={cvcHandler} onFocus={focusHandler} value={cardCVC}  />
            </form>
            <div className="confirm-card-payment">
                <button type="button" className="confirm-login" onClick={async()=>{await confirmBooking("card")}} >Purchase</button>
            </div>

        <br/><br/><br/><br/>
        <h2 className="Now-Showing" >Or</h2>
        <br/><br/>

        <br/><br/>
        <h2 className="Now-Showing" >Confirm Booking And Pay Upon Arrival</h2>
        <br/><br/><br/>


        <div className="confirm-card-payment">
            <button type="button" className="confirm-login" onClick={async()=>{await confirmBooking("cash")}} >Confirm</button>
        </div>


        </div>

    );
};

export default BookMovie;