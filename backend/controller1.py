

import moviecatalogue
import dbcontroller
import Users
import bookings
import movieschedule
import rooms
from flask import jsonify, Blueprint, request


class Controller_Class:

    def __init__(self):
        movie_catalogue_obj = moviecatalogue.MovieCatalogue_Class()

    def AddMovie(self, movie):
        movie_catalogue_obj = moviecatalogue.MovieCatalogue_Class()
        movie_catalogue_obj.AddMovie(movie)

    def Register(self, User):

        user_obj = Users.Users_Class()

        db_controller_ob = dbcontroller.DB_Controller()
        message = db_controller_ob.registerUser(User)

        if(message == "SUCCESS"):
            user_obj.registerUser(User)

        return message

    def Login(self, LoginInfo):

        User_Obj = Users.Users_Class()

        message = User_Obj.searchUser(LoginInfo)

        return message

    def RemoveMovie(self, movieID):

        movie_catalogue_obj = moviecatalogue.MovieCatalogue_Class()

        db_con_obj = dbcontroller.DB_Controller()
        status = db_con_obj.RemoveMovie(movieID)

        if(status == "SUCCESS"):
            movie_catalogue_obj.RemoveMovie(movieID)

        return status

    def SubmitFeedback(self, feedback):

        db_controller_ob = dbcontroller.DB_Controller()
        status = db_controller_ob.SubmitFeedback(feedback)

        return status

    def getMovies(self):

        movie_catalogue_obj = moviecatalogue.MovieCatalogue_Class()
        list_movies = movie_catalogue_obj.getMovies()
        return list_movies

    def SearchMovie(self, search):

        movie_catalogue_obj = moviecatalogue.MovieCatalogue_Class()
        search_results = movie_catalogue_obj.searchMovie(search)
        return search_results

    def addBooking(self, BookingInfo):

        bookings_obj = bookings.Bookings_Class()

        db_controller_ob = dbcontroller.DB_Controller()
        db_controller_ob.addBooking(BookingInfo)

        message = bookings_obj.addBooking(BookingInfo)
        return message

    def SubmitFeedback(self, feedback):

        db_controller_ob = dbcontroller.DB_Controller()
        status = db_controller_ob.SubmitFeedback(feedback)

        return status

    def getBookings(self, UserEmail):

        bookings_obj = bookings.Bookings_Class()
        results = bookings_obj.getBookings(UserEmail)
        return results

    def setMovieTime(self, movieTime):

        movie_schedule_obj = movieschedule.MovieSchedule_Class()

        db_controller_ob = dbcontroller.DB_Controller()
        status = db_controller_ob.setMovieTime(movieTime)

        if(status == "SUCCESS"):
            movie_schedule_obj.setMovieTime(movieTime)

        return status

    def getMovieSchedule(self, movieID):
        movie_schedule_obj = movieschedule.MovieSchedule_Class()
        movie_schedule = movie_schedule_obj.getMovieSchedule(movieID)
        return movie_schedule

    def getAvailableSeats(self, roomNum):
        rooms_obj = rooms.Rooms_Class()
        available_seats = rooms_obj.getAvailableSeats(roomNum)
        return available_seats

    def getAllBookings(self):
        bookings_obj = bookings.Bookings_Class()
        results = bookings_obj.getAllBookings()
        return results

    def cancelBooking(self, cancel_booking):

        db_controller_ob = dbcontroller.DB_Controller()
        db_controller_ob.cancelBooking(cancel_booking)

        bookings_obj = bookings.Bookings_Class()
        bookings_obj.cancelBooking(cancel_booking)

    def freeSeat(self, cancel_booking):

        db_controller_ob = dbcontroller.DB_Controller()
        db_controller_ob.freeSeat(cancel_booking)

        rooms_obj = rooms.Rooms_Class()
        rooms_obj.freeSeat(cancel_booking)
