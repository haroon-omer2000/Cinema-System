import React, {useEffect,useState} from 'react';

function BookedMovies(){

    const [Bookings,setBookings]=useState([]);
    const [flag,setFlag]=useState(false);

    useEffect(async()=>{

        var useremail=localStorage.getItem('UserEmail');

        const UserEmail={
            useremail
        };

        const response=await fetch('/GetBookedMovies',{
            method: "POST",
            headers: { 
                "Content-Type":"application/json"
            },
            body: JSON.stringify(UserEmail)
        }).then(response=>response.json().then(data=>{
                let ch=[];
                
                for(var i=0;i<data['message'].length;i++){
                    ch.push(data['message'][i]);
                }

                setBookings(ch);
        }));
    
    },[])

    return (
        <div className="no-bookings" >
            <br /><br />
            <h1 className="Now-Showing" >Your Bookings</h1>
 
        {(Bookings.length!==0)?
            <div className="content-table">
                <table className="content-table">
                    <thead>
                        <tr>
                        <th>Booking ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Movie Name</th>
                        <th>Movie Timing</th>
                        <th>Booking Date</th>
                        <th>Ticket Status</th>
                        <th>Payment</th>
                        <th>Ticket Type</th>
                        <th>Room No</th>
                        <th>Seat No</th>
                        <th>Cancel Booking</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {Bookings.map((item, index) => {
                            return (
                                <tr>
                                <td>{item[0]}</td>
                                <td>{item[1].toUpperCase()}</td>
                                <td>{item[2]}</td>
                                <td>{item[3]}</td>
                                <td>{item[5]}</td>
                                <td>{item[4]}</td>
                                <td>{item[6]}</td>
                                <td>{item[7].toUpperCase()}</td>
                                <td>{item[8]}</td>
                                <td>{item[9]}</td>
                                <td>{item[10]}</td>
                                <td><button  type="botton" className="confirm-login" onClick={
                                    async()=>{
                                        
                                        var BookingID=item[0];
                                        var Name=item[1];
                                        var Email=item[2];
                                        var Movie_Name=item[3];
                                        var Movie_Timing=item[5];
                                        var Booking_Date=item[4];
                                        var Ticket_Status=item[6];
                                        var Payment=item[7];
                                        var Ticket_Type=item[8];
                                        var Room_No=item[9];
                                        var Seat_No=item[10];

                                        const CancelBooking={
                                            
                                            BookingID,
                                            Name, 
                                            Email,
                                            Movie_Name,
                                            Movie_Timing,
                                            Booking_Date,
                                            Ticket_Status,
                                            Payment,
                                            Ticket_Type,
                                            Room_No,
                                            Seat_No
                                        };

                                        const response=await fetch('/CancelBooking',{
                                            method: "POST",
                                            headers: {
                                                "Content-Type":"application/json"
                                            },
                                            body: JSON.stringify(CancelBooking)
                                        }).then(response=>response.json().then(data=>{
                                            window.location.href='/BookedMovies'                                    
                                        }));
                                               
                                    }
                
                                } 
                                 >Cancel</button></td>
                                </tr>
                            );
                        })}  
                    </tbody>
                    
                </table>
            </div>
            :<div ><br/><br/><br/><br/><br/><br/><h3 className="no-bookings1" style={{"color":"white"}} >You Haven't Made Any Bookings Yet</h3></div>
        }   
        </div>
    );
}

export default BookedMovies;