
import sqlite3


class MovieSchedule_Class:

    movie_schedule = []

    def __init__(self):
        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()
        c.execute("select * from MovieSchedule")
        result = c.fetchall()
        self.movie_schedule = []
        for i in range(len(result)):
            self.movie_schedule.append(list(result[i]))
        conn.close()

    def setMovieTime(self, movieTime):
        status = "FAILURE"
        for i in range(len(self.movie_schedule)):
            if(self.movie_schedule[i][0] == movieTime['movieID']):
                self.movie_schedule[i][2] = movieTime['time1']
                self.movie_schedule[i][3] = movieTime['time2']
                self.movie_schedule[i][4] = movieTime['time3']
                self.movie_schedule[i][5] = movieTime['roomnum']
                status = "SUCCESS"

        return status

    def getMovieSchedule(self, movieID):

        movie_schedule1 = []

        for i in range(len(self.movie_schedule)):
            if(self.movie_schedule[i][0] == movieID['movieID']):
                movie_schedule1.append(
                    (self.movie_schedule[i][2], self.movie_schedule[i][3], self.movie_schedule[i][4], self.movie_schedule[i][5]))

        return movie_schedule1
