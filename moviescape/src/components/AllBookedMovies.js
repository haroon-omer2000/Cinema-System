import React, {useEffect,useState} from 'react';

function AllBookedMovies(){

    const [Bookings,setBookings]=useState([]);
    const [flag,setFlag]=useState(false);

    useEffect(async()=>{

        fetch("/AllBookedMovies").then(response=>response.json().then(data=>{
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
            <h1 className="Now-Showing" >All Bookings</h1>
 
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
                                </tr>
                            );
                        })}  
                    </tbody>
                    
                </table>
            </div>
            :<div ><br/><br/><br/><br/><br/><br/><h3 className="no-bookings1" style={{"color":"white"}} >There Are No Bookings Yet</h3></div>
        }   
        </div>
    );
}

export default AllBookedMovies;