import flask
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


@app.route("/")
def index():
    return render_template("index.html")


@app.route('/experts')
def route1():
    cursor = conn.cursor()
    cursor.execute(
        "SELECT email,firstname,lastname, city, state,profileDirectory,profile_intro,serviceMile FROM clients;")
    profiles = cursor.fetchall()
    cursor.execute("select email, category, skillname,charge, ratebyHour from skills;")
    skills = cursor.fetchall()
    return render_template("experts.html", profiles=profiles, skills=skills)


@app.route('/profile', methods=['POST'])
def getProfile():
    profileEmail = request.form['submit']
    profileEmail = ('"%s"' % profileEmail)
    cursor = conn.cursor()
    query = "select profileDirectory, firstname,lastname, profile_intro from clients  where email = " + profileEmail
    cursor.execute(query)
    profile_info = cursor.fetchall()
    query = "SELECT skillname, charge, rateByHour, description FROM skills WHERE email = " + profileEmail
    cursor.execute(query)
    skill_info = cursor.fetchall()
    return render_template("profile.html", profile_info=profile_info, skill_info=skill_info,
                           profileEmail = profileEmail)


@app.route('/profile/schedule', methods=['POST'])
def getSchedule():
    profileEmail = request.form['submit']
    cursor = conn.cursor()
    dateQuery = "SELECT appointmentDate FROM appointment WHERE DATEDIFF(NOW(), appointmentDate) >= - 7 AND DATEDIFF(NOW(), appointmentDate) <= 0 AND clientEmail = " + profileEmail
    cursor.execute(dateQuery)
    appointmentDate = cursor.fetchall()
    startTimeQuery = "SELECT appointStartTime FROM appointment WHERE DATEDIFF(NOW(), appointmentDate) >= - 7 AND DATEDIFF(NOW(), appointmentDate) <= 0 AND clientEmail = " + profileEmail
    cursor.execute(startTimeQuery)
    appointStartTime = cursor.fetchall()
    endTimeQuery = "SELECT appointEndTime FROM appointment WHERE DATEDIFF(NOW(), appointmentDate) >= - 7 AND DATEDIFF(NOW(), appointmentDate) <= 0 AND clientEmail = " + profileEmail
    cursor.execute(endTimeQuery)
    appointEndTime = cursor.fetchall()
    return render_template("schedule.html", appointmentDate=appointmentDate,appointStartTime = appointStartTime,appointEndTime=appointEndTime)


if __name__ == "__main__":
    app.run(debug=True)
