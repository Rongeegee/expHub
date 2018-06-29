from flask import *
from flaskext.mysql import MySQL

app = Flask(__name__)


mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'iLove$100only'
app.config['MYSQL_DATABASE_DB'] = 'expertHub'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

conn = mysql.connect()
cursor =conn.cursor()

cursor.execute("SELECT s.email,c.firstname,c.lastname, s.category, s.skillname, s.charge, s.rateByHour,c.profileDirectory FROM skills s, clients c WHERE c.email = s.email;")
data = cursor.fetchall()

for each in data:
    print(each[0])


@app.route("/")
def index():
    return render_template("index.html")


@app.route('/experts')
def route1():
    return render_template("experts.html", data=data)


if __name__ == "__main__":
    app.run(debug=True)

