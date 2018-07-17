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


app.secret_key = 'New_York_dog_meat'


@app.route('/get_id')
def expert():
    button_id = flask.request.args.get('the_id')
    flask.session['button_id'] = button_id
    return flask.jsonify({'success': True})


@app.route('/profile')
def route2():
    cursor = conn.cursor()
    profile_email = profile_email = ('"%s"' % flask.session['button_id'])
    query = "select profileDirectory, firstname,lastname, profile_intro from clients  where email = " + profile_email
    cursor.execute(query)
    profile_info = cursor.fetchall()
    query = "SELECT skillname, charge, rateByHour, description FROM skills WHERE email = " + profile_email
    cursor.execute(query)
    skill_info = cursor.fetchall()
    return render_template("profile.html", profile_info=profile_info, skill_info=skill_info,
                           profile_email=profile_email)


@app.route('/profile/schedule')
def schedule():
    cursor = conn.cursor()
    profile_email = ('"%s"' % flask.session['button_id'])
    dateQuery = "SELECT appointmentDate FROM appointment WHERE DATEDIFF(NOW(), appointmentDate) >= - 7 AND DATEDIFF(NOW(), appointmentDate) <= 0 AND clientEmail = " + profile_email
    cursor.execute(dateQuery)
    appointmentDate = cursor.fetchall()
    startTimeQuery = "SELECT appointStartTime FROM appointment WHERE DATEDIFF(NOW(), appointmentDate) >= - 7 AND DATEDIFF(NOW(), appointmentDate) <= 0 AND clientEmail = " + profile_email
    cursor.execute(startTimeQuery)
    appointStartTime = cursor.fetchall()
    endTimeQuery = "SELECT appointEndTime FROM appointment WHERE DATEDIFF(NOW(), appointmentDate) >= - 7 AND DATEDIFF(NOW(), appointmentDate) <= 0 AND clientEmail = " + profile_email
    cursor.execute(endTimeQuery)
    appointEndTime = cursor.fetchall()
    return render_template("schedule.html", appointmentDate=appointmentDate,appointStartTime = appointStartTime,appointEndTime=appointEndTime)


if __name__ == "__main__":
    app.run(debug=True)
