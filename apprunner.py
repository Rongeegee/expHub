import flask
from flask import *
from flaskext.mysql import *
from wtforms import Form, StringField, TextAreaField, validators
from passlib.hash import *

app = Flask(__name__)

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'samSam11'
app.config['MYSQL_DATABASE_DB'] = 'expertHub'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

conn = mysql.connect()
app.secret_key = "fmjq3orjf9asol"


@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        query = "SELECT email, pword FROM customer;"
        cursor = conn.cursor()
        cursor.execute(query)
        credentials = cursor.fetchall()
        for each in credentials:
            if request.form['email'] == each[0]:
                if request.form['password'] == each[1]:
                    session['logged_in'] = True
                    session['email'] = request.form['email']
                    return render_template('index.html')
                else:
                    error = 'Invalid Credentials. Please try again.'
        error = 'Invalid Credentials. Please try again.'
    return render_template('login.html', error=error)


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return render_template("index.html")



@app.route("/")
def index():
    return render_template("index.html")


@app.route('/experts')
def expertList():
    session['client_email'] = None
    cursor = conn.cursor()
    cursor.execute(
        "SELECT email,firstname,lastname, city, state,profileDirectory,profile_intro,serviceMile FROM clients;")
    profiles = cursor.fetchall()
    cursor.execute("select email, category, skillname,charge, ratebyHour from skills;")
    skills = cursor.fetchall()
    return render_template("experts.html", profiles=profiles, skills=skills)


@app.route('/profile/<email>')
def setProfile(email):
    cursor = conn.cursor()
    query = "select profileDirectory, firstname,lastname, profile_intro from clients  where email = " + email
    cursor.execute(query)
    profile_info = cursor.fetchall()
    query = "SELECT skillname, charge, rateByHour, description, skillID FROM skills WHERE email = " + email
    cursor.execute(query)
    skill_info = cursor.fetchall()
    return render_template("profile.html", profile_info=profile_info, skill_info=skill_info,
                           profileEmail= email)


@app.route('/appointmentMade', methods=['POST'])
def makeAppointment():
    appoint_info = request.form['submit']
    date = ('"%s"' % appoint_info.split(',')[0])
    start_time = appoint_info.split(',')[1]
    end_time = appoint_info.split(',')[2]
    skill_ID = appoint_info.split(',')[3]
    street = ('"%s"' % request.form['streetAddr'])
    if request.form['apartNum'] == "":
        aptNumber = "null"
    else:
        aptNumber = ('"%s"' % request.form['apartNum'])
    city = ('"%s"' % request.form['city'])
    state = ('"%s"' % request.form['state'])
    zip = request.form['zip']
    cursor = conn.cursor()
    query = 'select max(appointmentID) from appointment;'
    cursor.execute(query)
    appointID = cursor.fetchall()
    appointID = str(appointID[0][0] + 1)
    #sample query for this function: INSERT INTO appointment values (10, 'hola@das.com','sad@das.com','2018-08-12',1430,1530,'111 hola street', '3f',
    #'Queens','NY', 10013, 9);
    client_email = ('"%s"' % session['curr_expert_email'])
    customer_email = ('"%s"' % session['email'])
    query = "INSERT INTO appointment values (" + appointID + "," + client_email + "," + customer_email + ","+ date + "," + start_time + ","+ end_time + "," + street + "," + aptNumber + "," + city + "," + state + "," + zip + "," + skill_ID + ");"
    cursor.execute(query)
    conn.commit()
    return render_template('appointmentMade.html')


def getAppointId(string):
    index_first_commas = string.find(',')
    newString = string[2:index_first_commas]
    return newString


@app.route('/profile', methods=['POST'])
def getProfile():
    profileEmail = request.form['submit']
    session['curr_expert_email'] = profileEmail
    profileEmail = ('"%s"' % profileEmail)
    session['client_email'] = profileEmail
    return redirect(url_for('.setProfile', email = profileEmail))


@app.route('/profile/schedule', methods=['POST'])
def getSchedule():
    try:
        if session['logged_in'] == False:
            return redirect(url_for('login'))
        profileEmail = session['curr_expert_email']
        profileEmail = ('"%s"' % profileEmail)
        skill = request.form['submit']
        cursor = conn.cursor()
        dateQuery = "SELECT appointmentDate FROM appointment WHERE DATEDIFF(NOW(), appointmentDate) >= - 7 AND DATEDIFF(NOW(), appointmentDate) <= -1 AND clientEmail = " + profileEmail
        cursor.execute(dateQuery)
        appointmentDate = cursor.fetchall()
        startTimeQuery = "SELECT appointStartTime FROM appointment WHERE DATEDIFF(NOW(), appointmentDate) >= - 7 AND DATEDIFF(NOW(), appointmentDate) <= -1 AND clientEmail = " + profileEmail
        cursor.execute(startTimeQuery)
        appointStartTime = cursor.fetchall()
        endTimeQuery = "SELECT appointEndTime FROM appointment WHERE DATEDIFF(NOW(), appointmentDate) >= - 7 AND DATEDIFF(NOW(), appointmentDate) <= -1 AND clientEmail = " + profileEmail
        cursor.execute(endTimeQuery)
        appointEndTime = cursor.fetchall()
        return render_template("schedule.html", appointmentDate=appointmentDate, appointStartTime=appointStartTime,
                               appointEndTime=appointEndTime, skill = skill)
    except:
        return redirect(url_for('login'))












if __name__ == "__main__":
    app.run(debug=True)
