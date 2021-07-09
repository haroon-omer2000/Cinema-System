
class Movie_Class:

    def __init__(self):
        pass

    def setMovie(self, movieName, imdbID, moviePoster, imdbRating, moviePlot, movieYear, movieTrailer):
        self.movieName = movieName
        self.imdbID = imdbID
        self.moviePoster = moviePoster
        self.imdbRating = imdbRating
        self.moviePlot = moviePlot
        self.movieYear = movieYear
        self.movieTrailer = movieTrailer

    def getMovieInfo(self):
        return {
            'Movie_Name': self.movieName,
            'Movie_ID': self.imdbID,
            'Movie_Poster': self.moviePoster,
            'Movie_Plot': self.moviePlot,
            'Movie_Year': self.movieYear
        }
