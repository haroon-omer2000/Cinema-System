
import User
from flask import Flask, jsonify, Blueprint, request
import controller1
import dbcontroller

app = Flask(__name__)

controller_obj = controller1.Controller_Class()
db_controller_ob = dbcontroller.DB_Controller()
User_Object = User.User_Class()


@app.route("/AddMovie", methods=['POST'])
def AddMovie():

    movie = request.get_json()

    controller_obj.AddMovie(movie)

    return "", 201


@app.route("/movies")
def movies():

    New_Full_List = controller_obj.getMovies()

    #Full_List = db_controller_ob.getMovies()

    movie_list = []

    # print(Full_List)

    for i in range(len(New_Full_List)):
        movie_list.append({'Plot': New_Full_List[i][5], 'Year': New_Full_List[i][4], 'Poster': New_Full_List[i]
                           [3], 'imdbRating': New_Full_List[i][2], 'Title': New_Full_List[i][1], 'imdbID': New_Full_List[i][0], 'trailer': New_Full_List[i][6]})

    accType = User_Object.getType()

    return jsonify({'movies': movie_list, 'accType': accType})


@app.route("/SearchMovie", methods=['POST'])
def SearchMovie():

    search = request.get_json()

    search_results = controller_obj.SearchMovie(search)

    result_list = []

    for i in range(len(search_results)):
        result_list.append({'Plot': search_results[i][5], 'Year': search_results[i][4], 'Poster': search_results[i]
                            [3], 'imdbRating': search_results[i][2], 'Title': search_results[i][1], 'imdbID': search_results[i][0]})

    return jsonify({'results': result_list})


@app.route("/Register", methods=['POST'])
def Register():

    User = request.get_json()

    message = controller_obj.Register(User)

    #message = controller_obj.Register(User)

    return jsonify({'message': message})


@app.route("/Login", methods=['POST'])
def Login():

    LoginInfo = request.get_json()

    message = controller_obj.Login(LoginInfo)

    return jsonify({'message': message})


@app.route("/SetMovieTime", methods=['POST'])
def SetMovieTime():

    movieTime = request.get_json()

    status = controller_obj.setMovieTime(movieTime)

    #status = db_controller_ob.setMovieTime(movieTime)

    return jsonify({'message': status})


@app.route("/RemoveMovie", methods=['POST'])
def RemoveMovie():

    movieID = request.get_json()

    status = controller_obj.RemoveMovie(movieID)

    return jsonify({'message': status})


@app.route("/AllBookedMovies")
def AllBookedMovies():

    results = controller_obj.getAllBookings()

    return jsonify({'message': results})


@app.route("/GetMovieSchedule", methods=['POST'])
def GetMovieSchedule():

    movieID = request.get_json()

    movieSchedule = controller_obj.getMovieSchedule(movieID)

    available_seats = controller_obj.getAvailableSeats(movieSchedule[0][3])

    #movieSchedule = db_controller_ob.getMovieSchedule(movieID)

    return jsonify({'message': movieSchedule, 'available': available_seats})


@app.route("/BookMovie", methods=['POST'])
def BookMovie():

    BookingInfo = request.get_json()

    message = controller_obj.addBooking(BookingInfo)

    #message = db_controller_ob.addBooking(BookingInfo)

    return jsonify({'message': message})


@app.route("/GetBookedMovies", methods=['POST'])
def GetBookedMovies():

    UserEmail = request.get_json()

    results = controller_obj.getBookings(UserEmail)

    #results = db_controller_ob.getBookings(UserEmail)

    return jsonify({'message': results})


@app.route("/CancelBooking", methods=['POST'])
def CancelBooking():

    cancel_booking = request.get_json()

    controller_obj.cancelBooking(cancel_booking)

    controller_obj.freeSeat(cancel_booking)

    return jsonify({'message': 'successfull'})


@app.route("/SubmitFeedback", methods=['POST'])
def SubmitFeedback():

    feedback = request.get_json()

    print('idk')

    status = controller_obj.SubmitFeedback(feedback)

    return jsonify({'message': status})


app.run(debug=True)
