import flask
from flask import *
from flaskext.mysql import MySQL

app = Flask(__name__)

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'samSam11'
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
    cursor.execute("SELECT s.email, c.firstname, c.lastname, s.category, s.skillname,s.charge, s.rateByHour, c.profileDirectory FROM `experthub`.`skills` s, `experthub`.`clients` c WHERE c.email = s.email")
    data = cursor.fetchall()
    return render_template("experts.html", data=data)


app.secret_key = 'New_York_dog_meat'


@app.route('/get_id')
def expert():
    button_id = flask.request.args.get('the_id')
    flask.session['button_id'] = button_id
    return flask.jsonify({'success':True})


@app.route('/profile')
def route2():
    profile_email = '"' + flask.session['button_id'] + '"'
    query = "select profileDirectory, firstname,lastname, profile_intro from clients  where email = " + profile_email
    cursor.execute(query)
    profile_info = cursor.fetchall()
    query ="SELECT skillname, charge, rateByHour, description FROM skills WHERE email = " + profile_email
    cursor.execute(query)
    skill_info = cursor.fetchall()
    return render_template("profile.html", profile_info = profile_info, skill_info= skill_info)


if __name__ == "__main__":
    app.run(debug=True)
