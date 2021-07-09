
import sqlite3

conn = sqlite3.connect('moviescape.db')

c = conn.cursor()

# creating the tables

# c.execute("""Create table Movies (
#    id text,
# name text,
#   rating text,
#  poster text,
#   year text,
#   plot text,
#   trailer text
#   )""")

#c.execute("insert into movies values ('tt0372784', 'Batman Begins', '8.2', 'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', '2005', 'After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.','neY2xVmOfUM') ")
#c.execute("insert into movies values ('tt1119646', 'The Hangover', '7.7', 'https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', '2009', 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.','tcdUhdOlz9M') ")
#c.execute("insert into movies values ('tt0848228', 'The Avengers', '8.0', 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', '2012', 'Earths mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.','eOrNdBpGMv8') ")
#c.execute("insert into movies values ('tt3659388', 'The Martian', '8.0', 'https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg', '2015', 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.','ej3ioOneTy8') ")
#c.execute("insert into movies values ('tt6644200', 'A Quiet Place', '7.5', 'https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_SX300.jpg', '2018', 'In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.','WR7cc5t7tv8') ")
#c.execute("insert into movies values ('tt2184339', 'The Purge', '5.7', 'https://m.media-amazon.com/images/M/MV5BMTQzNTcwODEyM15BMl5BanBnXkFtZTcwMjM1MDI0OQ@@._V1_SX300.jpg', '2017', 'A wealthy family is held hostage for harboring the target of a murderous syndicate during the Purge, a 12-hour period in which any and all crime is legal.','K0LLaybEuzA') ")
#c.execute("insert into movies values ('tt4154664', 'Captain Marvel', '6.9', 'https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg', '2019', 'Carol Danvers becomes one of the universes most powerful heroes when Earth is caught in the middle of a galactic war between two alien races.','Z1BCujX3pw8') ")
#c.execute("insert into movies values ('tt0770828', 'Man Of Steel', '7.0', 'https://m.media-amazon.com/images/M/MV5BMTk5ODk1NDkxMF5BMl5BanBnXkFtZTcwNTA5OTY0OQ@@._V1_SX300.jpg', '2013', 'An alien child is evacuated from his dying world and sent to Earth to live among humans. His peace is threatened, when other survivors of his home planet invade Earth.','T6DJcgm3wNY') ")
#c.execute("insert into movies values ('tt5022702', 'Hush', '6.6', 'https://m.media-amazon.com/images/M/MV5BOWQ4OTdlODQtMDc3Yy00MGVmLWExYjUtOGI0Yjg4MDQzNDNhXkEyXkFqcGdeQXVyNjIzMzkyMzk@._V1_SX300.jpg', '2016', 'A deaf and mute writer who retreated into the woods to live a solitary life must fight for her life in silence when a masked killer appears at her window.','Q_P8WCbhC6s') ")
#c.execute("insert into movies values ('tt1825683', 'Black Panther', '7.3', 'https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SX300.jpg', '2017', 'TChalla, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his countrys past.','xjDjIWPwcPU') ")
#c.execute("insert into movies values ('tt2975590', 'Batman v Superman: Dawn of Justice', '6.4', 'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', '2016', 'Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.','0WWzgGyAH6Y') ")

# populating the tables

# c.execute("""Create table Users(
#    id integer,
#    username text,
#    password text,
#    contact text,
#    email text,
#    type text
# )""")

# c.execute("insert into users values (1,'admin','adminpassword123','03315684326','admin1998@yahoo.com','admin')")

# c.execute("""Create table Bookings(
#    serialnum integer,
#    customername text,
#    customeremail text,
#    moviename text,
#    bookingtime text,
#    duration text,
#    payment text,
#    paymenttype text,
#    ticket text,
#    roomnum integer,
#    seatnum integer
# )""")


# c.execute("""Create table Rooms(
#    roomnum text,
#    seatnum integer,
#    time1status text,
#    time2status text,
#    time3status text
# )""")

# c.execute("insert into rooms values ('room1',1,'Available','Available','Available')")
# c.execute("insert into rooms values ('room1',2,'Available','Available','Available')")
# c.execute("insert into rooms values ('room1',3,'Available','Available','Available')")
# c.execute("insert into rooms values ('room1',4,'Available','Available','Available')")
# c.execute("insert into rooms values ('room1',5,'Available','Available','Available')")
# c.execute("insert into rooms values ('room1',6,'Available','Available','Available')")
# c.execute("insert into rooms values ('room1',7,'Available','Available','Available')")
# c.execute("insert into rooms values ('room1',8,'Available','Available','Available')")
# c.execute("insert into rooms values ('room1',9,'Available','Available','Available')")
# c.execute("insert into rooms values ('room1',10,'Available','Available','Available')")
# c.execute("insert into rooms values ('room2',1,'Available','Available','Available')")
# c.execute("insert into rooms values ('room2',2,'Available','Available','Available')")
# c.execute("insert into rooms values ('room2',3,'Available','Available','Available')")
# c.execute("insert into rooms values ('room2',4,'Available','Available','Available')")
# c.execute("insert into rooms values ('room2',5,'Available','Available','Available')")
# c.execute("insert into rooms values ('room2',6,'Available','Available','Available')")
# c.execute("insert into rooms values ('room2',7,'Available','Available','Available')")
# c.execute("insert into rooms values ('room2',8,'Available','Available','Available')")
# c.execute("insert into rooms values ('room2',9,'Available','Available','Available')")
# c.execute("insert into rooms values ('room2',10,'Available','Available','Available')")
# c.execute("insert into rooms values ('room3',1,'Available','Available','Available')")
# c.execute("insert into rooms values ('room3',2,'Available','Available','Available')")
# c.execute("insert into rooms values ('room3',3,'Available','Available','Available')")
# c.execute("insert into rooms values ('room3',4,'Available','Available','Available')")
# c.execute("insert into rooms values ('room3',5,'Available','Available','Available')")
# c.execute("insert into rooms values ('room3',6,'Available','Available','Available')")
# c.execute("insert into rooms values ('room3',7,'Available','Available','Available')")
# c.execute("insert into rooms values ('room3',8,'Available','Available','Available')")
# c.execute("insert into rooms values ('room3',9,'Available','Available','Available')")
# c.execute("insert into rooms values ('room3',10,'Available','Available','Available')")


# c.execute("""Create table MovieSchedule(
# movieid text,
#    moviename text,
#    time1 text,
#       time2 text,
# time3 text,
#    roomnum integer
# )""")


# c.execute("Insert into Users values (1,'admin','adminpassword123','03316548623','admin1998@yahoo.com','admin') ")

#c.execute("Insert into MovieSchedule values ('tt0372784','Batman Begins','None','14:00-16:00','None',1)")
#c.execute("Insert into MovieSchedule values ('tt1119646','The Hangover','14:00-16:00','18:00-20:00','None',3)")
#c.execute("Insert into MovieSchedule values ('tt0848228','The Avengers','None','18:00-20:00','22:00-24:00',1)")
#c.execute("Insert into MovieSchedule values ('tt3659388','The Martian','14:00-16:00','None','22:00-24:00',2)")
#c.execute("Insert into MovieSchedule values ('tt6644200','A Quiet Place','None','18:00-20:00','22:00-24:00',3)")
#c.execute("Insert into MovieSchedule values ('tt2184339','The Purge','14:00-16:00','18:00-20:00','None',1)")
#c.execute("Insert into MovieSchedule values ('tt4154664','Captain Marvel','14:00-16:00','18:00-20:00','None',2)")
#c.execute("Insert into MovieSchedule values ('tt0770828','Man Of Steel','None','18:00-20:00','22:00-24:00',3)")
#c.execute("Insert into MovieSchedule values ('tt5022702','Hush','None','18:00-20:00','22:00-24:00',1)")
#c.execute("Insert into MovieSchedule values ('tt1825683','Black Panther','None','18:00-20:00','22:00-24:00',2)")
#c.execute("Insert into MovieSchedule values ('tt2975590','Batman v Superman: Dawn of Justice','14:00-16:00','18:00-20:00','None',3)")


# c.execute("Insert into MovieSchedule values ('tt0348150','Superman Returns','14:00-16:00','None','22:00-24:00',2)")

# c.execute("Insert into MovieSchedule values ('tt3501632','Thor : Ragnarok','None','18:00-20:00','22:00-24:00',1)")
# c.execute("Insert into MovieSchedule values ('tt4154796','Avengers: Endgame','14:00-16:00','None','22:00-24:00',2)")
# c.execute("Insert into MovieSchedule values ('tt4154756','Avengers: Infinity War','14:00-16:00','None','22:00-24:00',3)")
# c.execute("Insert into MovieSchedule values ('tt3065204','The Conjuring 2','14:00-16:00','None','22:00-24:00',1)")
# c.execute("Insert into MovieSchedule values ('tt7286456','Joker','14:00-16:00','18:00-20:00','None',2)")
# c.execute("Insert into MovieSchedule values ('tt1392170','The Hunger Games','14:00-16:00','18:00-20:00','22:00-24:00',3)")


# result = c.fetchall()

# result = list(result)

# i = 1

# for val in result:
#    print(i, val[1], val[2], val[3], val[4], val[5])
#    i += 1


# filename = open("feedback.csv", 'a+')
# filename.write('2' + ',' + 'Haroon' + '\n')
# filename.write('3' + ',' + 'Talal' + '\n')
# filename.close()

#c.execute('Select * from Movies')
# print(c.fetchall())

# movies = list(c.fetchall())
c.execute("select * from MovieSchedule")

movies = c.fetchall()
for movie in movies:
    print(movie, '\n\n')

conn.commit()

conn.close()
