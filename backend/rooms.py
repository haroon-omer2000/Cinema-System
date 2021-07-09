
import sqlite3


class Rooms_Class:

    Rooms_Status = []

    def __init__(self):
        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()
        c.execute("Select * from Rooms")
        list_rooms = c.fetchall()
        conn.close()
        self.Rooms_Status = list_rooms

    def getAvailableSeats(self, roomNum):
        rNum = ""
        if(roomNum == 1):
            rNum = "room1"
        elif(roomNum == 2):
            rNum = "room2"
        else:
            rNum = "room3"

        available_seats_time1 = []
        available_seats_time2 = []
        available_seats_time3 = []

        for i in range(len(self.Rooms_Status)):
            if(self.Rooms_Status[i][0] == rNum):
                if(self.Rooms_Status[i][2] == 'Available'):
                    available_seats_time1.append(self.Rooms_Status[i][1])
                if(self.Rooms_Status[i][3] == 'Available'):
                    available_seats_time2.append(self.Rooms_Status[i][1])
                if(self.Rooms_Status[i][4] == 'Available'):
                    available_seats_time3.append(self.Rooms_Status[i][1])

        available_seats = []
        available_seats.append(available_seats_time1)
        available_seats.append(available_seats_time2)
        available_seats.append(available_seats_time3)

        return available_seats

    def freeSeat(self, cancel_booking):

        slot = 0
        roomnum = ""

        if(cancel_booking['Movie_Timing'] == '14:00-16:00'):
            slot = 2
        elif(cancel_booking['Movie_Timing'] == '18:00-20:00'):
            slot = 3
        else:
            slot = 4

        if(cancel_booking['Room_No'] == '1'):
            roomnum = "room1"
        elif(cancel_booking['Room_No'] == '2'):
            roomnum = "room2"
        else:
            roomnum = "room3"

        temp_room_status = []

        for i in range(len(self.Rooms_Status)):

            if((self.Rooms_Status[i][1] == int(cancel_booking['Seat_No'])) and ((self.Rooms_Status[i][0] == roomnum))):
                if(slot == 2):
                    temp_room_status.append((roomnum, int(
                        cancel_booking['Seat_No']), 'Available', self.Rooms_Status[i][3], self.Rooms_Status[i][4]))
                elif(slot == 3):
                    temp_room_status.append((roomnum, int(
                        cancel_booking['Seat_No']), self.Rooms_Status[i][2], 'Available', self.Rooms_Status[i][4]))
                else:
                    temp_room_status.append((roomnum, int(
                        cancel_booking['Seat_No']), self.Rooms_Status[i][2], self.Rooms_Status[i][3], 'Available'))

            else:
                temp_room_status.append(self.Rooms_Status[i])

        self.Rooms_Status = temp_room_status
