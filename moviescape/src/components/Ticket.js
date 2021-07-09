import React from 'react';
import jsPDF from 'jspdf';
import render from 'react-dom';
import { useReactToPrint} from 'react-to-print';


const Ticket=({type})=>{

    return(
        <div class="content-table">
            <table class="content-table">
                <thead>
                    <tr>
                    <th>Booking ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Movie Name</th>
                    <th>Movie Timing</th>
                    <th>Booking Date</th>
                    <th>Ticket</th>
                    <th>Payment</th>
                    <th>Room No</th>
                    <th>Seat No</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="active-row">
                    <td>{localStorage.getItem('serial_num')}</td>
                    <td>{localStorage.getItem('UserName')}</td>
                    <td>{localStorage.getItem('UserEmail')}</td>
                    <td>{localStorage.getItem('Title')}</td>
                    <td>{localStorage.getItem('movie_time')}</td>
                    <td>{localStorage.getItem('booking_time')}</td>
                    <td>{localStorage.getItem('tickettype')}</td>
                    <td>{localStorage.getItem('payment')}</td>
                    <td>{localStorage.getItem('roomno')}</td>
                    <td>{localStorage.getItem('selected_seat')}</td>
                    </tr>
               </tbody>
                </table>
        </div>
    );
}

export default Ticket;