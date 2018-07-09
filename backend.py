import flask
from flask import *
from flaskext.mysql import MySQL

app = Flask(__name__)

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'iLove$100only'
app.config['MYSQL_DATABASE_DB'] = 'experthub'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

conn = mysql.connect()



@app.route("/")
def retrieve():
    cursor = conn.cursor()
    #cursor.execute("SELECT * FROM 'experthub'.'clients';")
    cursor.execute("SELECT * FROM `experthub`.`customer`")
    data = cursor.fetchall()
    for row in data:
        print (row[0] + " " + row[1] + " " + row[2])

    return "<h1> hello</h1>"






if __name__ == "__main__":
    app.run(debug=True)