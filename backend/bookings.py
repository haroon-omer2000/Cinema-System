import sqlite3
from datetime import date


class Bookings_Class:

    bookings = []

    def __init__(self):
        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()
        c.execute("select * from Bookings")
        self.bookings = c.fetchall()
        conn.close()

    def addBooking(self, BookingInfo):

        booking_id = 0

        if(len(self.bookings) != 0):
            booking_id = self.bookings[len(self.bookings)-1][0]+1

        else:
            booking_id = 1

        today = date.today()
        bookingtime = today.strftime("%d/%m/%Y")

        self.bookings.append((booking_id, BookingInfo['username'], BookingInfo['useremail'], BookingInfo['moviename'], bookingtime,
                              BookingInfo['duration'], BookingInfo['payment'], BookingInfo['paymenttype'], BookingInfo['tickettype'], BookingInfo['roomno'], BookingInfo['selected_seat']))

        return [booking_id, bookingtime, BookingInfo['roomno'], BookingInfo['selected_seat']]

    # customer
    def getBookings(self, UserEmail):

        results = []

        for i in range(len(self.bookings)):
            if(self.bookings[i][2] == UserEmail['useremail']):
                results.append(self.bookings[i])

        return results

    # admin
    def getAllBookings(self):

        return self.bookings

    def cancelBooking(self, cancel_booking):

        temp_bookings = []

        for i in range(len(self.bookings)):
            if(cancel_booking['BookingID'] == self.bookings[i][0]):
                continue
            temp_bookings.append(self.bookings[i])

        self.bookings = temp_bookings
