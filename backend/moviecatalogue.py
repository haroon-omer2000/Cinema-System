
import movie
import dbcontroller
import sqlite3


class MovieCatalogue_Class:

    movie_list = []

    def __init__(self):
        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()
        c.execute("Select * from Movies")
        list_movies = c.fetchall()
        conn.close()
        self.movie_list = list_movies

    def AddMovie(self, movies):
        movie_obj = movie.Movie_Class()
        movie_obj.setMovie(movies['movieName'], movies['movieIMDBID'],
                           movies['moviePoster'], movies['movieRating'], movies['moviePlot'], movies['movieYear'], movies['movieTrailer'])
        db_con_obj = dbcontroller.DB_Controller()
        db_con_obj.AddMovie(movies)
        self.movie_list.append((movies['movieIMDBID'], movies['movieName'], movies['movieRating'],
                                movies['moviePoster'], movies['movieYear'], movies['moviePlot'], movies['movieTrailer']))

    def RemoveMovie(self, movieID):
        for i in range(len(self.movie_list)):
            if(self.movie_list[i][0] == movieID['movieID']):
                self.movie_list.pop()

    def getMovies(self):

        return self.movie_list

    def searchMovie(self, search):

        if(search != ""):

            search_results = []
            for i in range(len(self.movie_list)):
                if(search.lower() in (self.movie_list[i][1].lower())):
                    search_results.append(self.movie_list[i])

            return search_results

        else:
            return self.movie_list
