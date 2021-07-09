
import sqlite3
import User
from datetime import date


class DB_Controller:

    def __init__(self):
        pass

    def AddMovie(self, movie):
        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()
        movie['moviePlot'] = movie['moviePlot'].replace("'", "")
        c.execute("Insert into Movies values ('{}','{}','{}','{}','{}','{}')".format(
            movie['movieIMDBID'], movie['movieName'], movie['movieRating'], movie['moviePoster'], movie['movieYear'], movie['moviePlot']))
        c.execute("Insert into MovieSchedule values ('{}','{}','{}','{}','{}','{}')".format(
            movie['movieIMDBID'], movie['movieName'], 'None', 'None', 'None', 'None'))
        conn.commit()
        conn.close()

    def getMovies(self):
        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()
        c.execute("Select * from Movies")
        conn.commit()
        list_movies = c.fetchall()
        return list_movies

    def getSearch(self, search):
        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()
        c.execute(
            "Select * from Movies where name like '%{}%' ".format(search))
        search_results = c.fetchall()
        return search_results

    def registerUser(self, User):

        message = ""

        username = User['username']
        password = User['password']
        contact = User['contact']
        email = User['email']

        username = username.lower()

        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()

        # checking if user with same email exists
        c.execute(
            "Select email from Users where email='{}' ".format(email))

        # if user doesnt already exist
        if(len(c.fetchall()) == 0):
            c.execute("select MAX(id) from Users as max_user_id")
            max_id = c.fetchall()[0][0]

            if(max_id == None):
                max_id = 1
            else:
                max_id = max_id+1

            c.execute("insert into Users values ({},'{}','{}','{}','{}','{}') ".format(
                max_id, username, password, contact, email, 'customer'))
            conn.commit()
            c.execute("Select * from Users")
            search_results = c.fetchall()
            conn.close()
            message = "SUCCESS"
            return message

        else:
            conn.close()
            message = "FAILURE"
            return message

    def Login_User(self, Login_Info):

        message = ""

        email = Login_Info['email']
        password = Login_Info['password']

        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()

        c.execute(
            "Select * from Users where ( email like '{}' and password like '{}' ) ".format(email, password))

        results = c.fetchall()

        # case where credentials are correct and user exists
        if(len(results) != 0):

            results = list(results[0])

            if(results[5] == 'customer'):
                message = "customer/{}".format(results[1])

            elif(results[5] == 'admin'):
                message = "admin/{}".format(results[1])

            User_Object = User.User_Class()
            User_Object.setUser(results[1], results[5])

            results.append("Found")

        # case where no such user/admin exists
        else:

            results = "No_User_Found"

        conn.close()

        return results

    def SubmitFeedback(self, feedback):

        feedback['feedback'] = feedback['feedback'].replace("'", "")

        filename = open("feedback.csv", 'a+')
        filename.write(feedback['userID'] + ',' + feedback['userName'] + ',' +
                       feedback['userEmail'] + ',' + str(feedback['userContact']) + ',' + feedback['feedback'] + '\n')
        filename.close()

        return "OK"

    def addBooking(self, BookingInfo):
        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()
        c.execute("select max(serialnum) from Bookings")

        booking_list = c.fetchall()[0][0]

        today = date.today()
        bookingtime = today.strftime("%d/%m/%Y")

        serialno = 0

        if(booking_list == None):
            serialno = 1

        else:
            c.execute("select max(serialnum) from Bookings")
            serialno = c.fetchall()[0][0]+1

        c.execute("insert into Bookings values ({},'{}','{}','{}','{}','{}','{}','{}','{}',{},{})".format(
            serialno, BookingInfo['username'], BookingInfo['useremail'], BookingInfo['moviename'], bookingtime, BookingInfo['duration'], BookingInfo['payment'], BookingInfo['paymenttype'], BookingInfo['tickettype'], BookingInfo['roomno'], int(BookingInfo['selected_seat'])))

        rNo = ""
        if(BookingInfo['roomno'] == 1):
            rNo = "room1"
        elif(BookingInfo['roomno'] == 2):
            rNo = "room2"
        else:
            rNo = "room3"

        if(BookingInfo['duration'] == "14:00-16:00"):
            c.execute("Update Rooms set time1status='Not Available' where ( roomnum like '{}' and seatnum={} ) ".format(
                rNo, BookingInfo['selected_seat']))

        elif(BookingInfo['duration'] == "18:00-20:00"):
            c.execute("Update Rooms set time2status='Not Available' where ( roomnum like '{}' and seatnum={} ) ".format(
                rNo, BookingInfo['selected_seat']))

        else:
            c.execute("Update Rooms set time3status='Not Available' where ( roomnum like '{}' and seatnum={} ) ".format(
                rNo, BookingInfo['selected_seat']))

        conn.commit()
        conn.close()

    def getBookings(self, UserEmail):

        useremail = UserEmail['useremail']

        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()
        c.execute(
            "select * from Bookings where customeremail like '{}' ".format(useremail))

        results = c.fetchall()

        results = list(results)

        conn.close()

        return results

    def setMovieTime(self, movieTime):

        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()
        status = ""

        c.execute(
            "select * from Movies where id like '{}'".format(movieTime['movieID']))

        result = c.fetchall()

        if(len(result) != 0):
            c.execute("Update MovieSchedule set time1='{}', time2='{}' ,time3='{}', roomnum={} where movieid like '{}' ".format(
                movieTime['time1'], movieTime['time2'], movieTime['time3'], movieTime['roomnum'], movieTime['movieID']))
            status = "SUCCESS"

        else:
            status = "FAILURE"

        conn.commit()
        conn.close()

        return status

    def getMovieSchedule(self, movieID):

        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()

        c.execute(
            "Select time1,time2,time3 from MovieSchedule where movieid like'{}'".format(movieID['movieID']))

        schedule = list(c.fetchall())

        conn.commit()
        conn.close()

        return schedule

    def RemoveMovie(self, movieID):

        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()

        c.execute("select * from Movies where id like '{}'".format(
            movieID['movieID']))

        result = list(c.fetchall())

        status = ""

        if(len(result) != 0):

            c.execute("delete from Movies where id like '{}' ".format(
                movieID['movieID']))

            c.execute("delete from MovieSchedule where movieid like '{}' ".format(
                movieID['movieID']))

            status = "SUCCESS"

        else:
            status = "FAILURE"

        conn.commit()
        conn.close()

        return status

    def SubmitFeedback(self, feedback):

        feedback['feedback'] = feedback['feedback'].replace("'", "")

        filename = open("feedback.csv", 'a+')
        filename.write(feedback['userID'] + ',' + feedback['userName'] + ',' +
                       feedback['userEmail'] + ',' + feedback['userContact'] + ',' + feedback['feedback'] + '\n')
        filename.close()

        return "OK"

    def cancelBooking(self, cancel_booking):

        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()

        c.execute(
            "delete from Bookings where serialnum={} ".format(cancel_booking['BookingID']))

        conn.commit()
        conn.close()

    def freeSeat(self, cancel_booking):

        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()

        time = ""
        roomnum = ""

        if(cancel_booking['Movie_Timing'] == '14:00-16:00'):
            time = "time1status"
        elif(cancel_booking['Movie_Timing'] == '18:00-20:00'):
            time = "time2status"
        else:
            time = "time3status"

        if(cancel_booking['Room_No'] == 1):
            roomnum = "room1"
        elif(cancel_booking['Room_No'] == 2):
            roomnum = "room2"
        else:
            roomnum = "room3"

        c.execute(
            "update  Rooms set {}='Available' where (roomnum ='{}' and seatnum={}) ".format(time, roomnum, cancel_booking['Seat_No']))

        conn.commit()
        conn.close()
