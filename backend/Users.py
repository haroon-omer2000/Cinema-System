import sqlite3
import dbcontroller
import User


class Users_Class:

    Users_List = []

    def __init__(self):
        conn = sqlite3.connect('moviescape.db')
        c = conn.cursor()
        c.execute("Select * from Users")
        users = c.fetchall()
        self.Users_List = users
        conn.close()

    def registerUser(self, User):

        id = 0

        if(len(self.Users_List) != 0):
            id = self.Users_List[len(self.Users_List)-1][0] + 1

        else:
            id = 1

        self.Users_List.append(
            (id, User['username'], User['password'], User['contact'], User['email'], 'customer'))

    def searchUser(self, LoginInfo):

        message = "No_User_Found"

        for i in range(len(self.Users_List)):
            if(self.Users_List[i][2] == LoginInfo['password'] and self.Users_List[i][4] == LoginInfo['email']):
                User_Object = User.User_Class()
                User_Object.setUser(
                    self.Users_List[i][1], self.Users_List[i][5])
                message = list(self.Users_List[i])
                message.append('Found')

        #db_con_obj = dbcontroller.DB_Controller()
        #message = db_con_obj.Login_User(LoginInfo)

        return message
